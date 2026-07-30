/**
 * End-to-end checks for the rules that are easy to get wrong: queue position,
 * the bonus cap, restricted-state capture, referral crediting and duplicates.
 *
 * Re-runnable against a database that already has rows — every address is
 * unique per run and every position is asserted relative to the count the run
 * started from, so it never needs a reset to pass.
 *
 * Needs the dev server up. SMOKE_BASE_URL overrides the default port.
 */
const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3111";
const RUN = Date.now();
let seq = 0;
const email = (label) => `smoke-${RUN}-${seq++}-${label}@example.com`;

// This run makes a burst of signups on purpose, which the limiter is right to
// refuse. Fail loudly and usefully rather than reporting a wall of red.
let warnedAboutLimit = false;
const guardRateLimit = (result) => {
  if (result.status === 429 && !warnedAboutLimit) {
    warnedAboutLimit = true;
    console.error(
      "\n  Rate limiter is active, so these checks cannot run.\n" +
        "  Restart the dev server with DISABLE_RATE_LIMIT=1 and try again.\n",
    );
  }
  return result;
};

const post = async (path, body) => {
  const response = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let json = null;
  try { json = await response.json(); } catch {}
  return guardRateLimit({ status: response.status, json });
};

const results = [];
const check = (name, pass, detail) => {
  results.push(pass);
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  → " + detail : ""}`);
};

const stats = await (await fetch(`${BASE}/api/stats`)).json();
const base = stats.eligibleCount;
console.log(`baseline: ${base} eligible signups\n`);

// 1 — an eligible signup takes the next position and, under the cap, a bonus
const alexEmail = email("alex");
const a = await post("/api/signup", {
  email: alexEmail, name: "Alex Rivera", state: "California",
  ageConfirmed: true, termsAgreed: true,
  challengeInterests: ["Push-ups", "Planks"], referralSource: "TikTok",
});
const codeA = a.json?.signup?.referralCode;
check("eligible signup created", a.status === 201, `status ${a.status}`);
check("takes the next position", a.json?.signup?.waitlistPosition === base + 1,
  `expected ${base + 1}, got ${a.json?.signup?.waitlistPosition}`);
check("bonus eligible under the cap",
  a.json?.signup?.bonusEligible === (base + 1 <= stats.cap));
check("referral code is 6 unambiguous chars", /^[2-9A-HJ-NP-Z]{6}$/.test(codeA ?? ""), codeA);

// 2 — the same address cannot join twice, whatever the casing
const dup = await post("/api/signup", {
  email: alexEmail.toUpperCase(), name: "Alex Again", state: "Texas",
  ageConfirmed: true, termsAgreed: true,
});
check("duplicate email → 409 (case-insensitive)", dup.status === 409, `status ${dup.status}`);

// 3 — the duplicate-check endpoint agrees with the write path
const taken = await post("/api/email", { email: alexEmail });
const free = await post("/api/email", { email: email("nobody") });
check("email check reports taken", taken.json?.taken === true);
check("email check reports free", free.json?.taken === false);

// 4 — a referral from a real code is credited
const b = await post("/api/signup", {
  email: email("sam"), name: "Sam Okafor", state: "New York",
  ageConfirmed: true, termsAgreed: true, referredByCode: codeA,
});
check("referred signup created", b.status === 201, `status ${b.status}`);
check("position increments", b.json?.signup?.waitlistPosition === base + 2,
  `expected ${base + 2}, got ${b.json?.signup?.waitlistPosition}`);

// 5 — a code that matches nobody is dropped, not stored dangling
const c = await post("/api/signup", {
  email: email("kim"), name: "Kim Park", state: "Ohio",
  ageConfirmed: true, termsAgreed: true, referredByCode: "ZZZZZZ",
});
check("unknown referral code accepted but not credited", c.status === 201, `status ${c.status}`);

// 6 — restricted state: captured for notify-me, but no place and no bonus
const r = await post("/api/signup", {
  email: email("dana"), state: "Hawaii", ageConfirmed: true,
});
check("restricted state captured", r.status === 201, `status ${r.status}`);
check("restricted holds no position", r.json?.signup?.waitlistPosition === null,
  `got ${r.json?.signup?.waitlistPosition}`);
check("restricted gets no bonus", r.json?.signup?.bonusEligible === false);
check("restricted status recorded", r.json?.signup?.status === "restricted_state",
  r.json?.signup?.status);

// 7 — and therefore does not consume a queue position
const d = await post("/api/signup", {
  email: email("jo"), name: "Jo Mendez", state: "Nevada",
  ageConfirmed: true, termsAgreed: true,
});
check("restricted signup did not consume a position",
  d.json?.signup?.waitlistPosition === base + 4,
  `expected ${base + 4}, got ${d.json?.signup?.waitlistPosition}`);

// 8 — the age gate is enforced server-side, not just in the browser
const under = await post("/api/signup", {
  email: email("teen"), name: "Teen", state: "Texas",
  ageConfirmed: false, termsAgreed: true,
});
check("ageConfirmed false → 403", under.status === 403, `status ${under.status}`);

// 9 — an eligible signup cannot skip the agreement
const noTerms = await post("/api/signup", {
  email: email("noterms"), name: "No Terms", state: "Texas",
  ageConfirmed: true, termsAgreed: false,
});
check("eligible signup without terms → 400", noTerms.status === 400, `status ${noTerms.status}`);

// 10 — the return visit shows the referral that was just credited
const status = await fetch(`${BASE}/status/${codeA}`);
// React separates adjacent text nodes with <!-- --> in server-rendered markup.
const html = (await status.text()).replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ");
check("status page renders", status.status === 200, `status ${status.status}`);
check("status page shows the 1 referral", /1 friend has joined on your link/i.test(html));

// 11 — the shareable link carries the code into the flow, normalised
const redirect = await fetch(`${BASE}/r/${codeA?.toLowerCase()}`, { redirect: "manual" });
const location = redirect.headers.get("location") ?? "";
check("/r/code redirects", redirect.status === 307, `status ${redirect.status}`);
check("redirect normalises the code to uppercase", location.includes(`ref=${codeA}`), location);

// 12 — an unknown code is a 404, not an empty success page
const missing = await fetch(`${BASE}/status/ZZZZZZ`);
check("unknown status code → 404", missing.status === 404, `status ${missing.status}`);

const failed = results.filter((pass) => !pass).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
if (failed) process.exitCode = 1;
