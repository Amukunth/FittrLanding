/**
 * End-to-end checks for the rules that are easy to get wrong: queue position,
 * referral-code handling and duplicates.
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

// 1 — an eligible signup takes the next position
const alexEmail = email("alex");
const a = await post("/api/signup", {
  email: alexEmail, name: "Alex Rivera",
  ageConfirmed: true, termsAgreed: true, phone: "5555550100",
});
const codeA = a.json?.signup?.referralCode;
check("eligible signup created", a.status === 201, `status ${a.status}`);
check("takes the next position", a.json?.signup?.waitlistPosition === base + 1,
  `expected ${base + 1}, got ${a.json?.signup?.waitlistPosition}`);
// The bonus programme is withdrawn and nothing renders this, but the column
// is still written — this guards that leftover plumbing until it is removed.
check("bonus_eligible still written under the cap",
  a.json?.signup?.bonusEligible === (base + 1 <= stats.cap));
check("referral code is 6 unambiguous chars", /^[2-9A-HJ-NP-Z]{6}$/.test(codeA ?? ""), codeA);

// 2 — the same address cannot join twice, whatever the casing
const dup = await post("/api/signup", {
  email: alexEmail.toUpperCase(), name: "Alex Again",
  ageConfirmed: true, termsAgreed: true, phone: "5555550100",
});
check("duplicate email → 409 (case-insensitive)", dup.status === 409, `status ${dup.status}`);

// 3 — the duplicate-check endpoint agrees with the write path
const taken = await post("/api/email", { email: alexEmail });
const free = await post("/api/email", { email: email("nobody") });
check("email check reports taken", taken.json?.taken === true);
check("email check reports free", free.json?.taken === false);

// 4 — a signup carrying a real referral code is recorded against it
const b = await post("/api/signup", {
  email: email("sam"), name: "Sam Okafor", phone: "5555550100",
  ageConfirmed: true, termsAgreed: true, referredByCode: codeA,
});
check("referred signup created", b.status === 201, `status ${b.status}`);
check("position increments", b.json?.signup?.waitlistPosition === base + 2,
  `expected ${base + 2}, got ${b.json?.signup?.waitlistPosition}`);

// 5 — a code that matches nobody is dropped, not stored dangling
const c = await post("/api/signup", {
  email: email("kim"), name: "Kim Park", phone: "5555550100",
  ageConfirmed: true, termsAgreed: true, referredByCode: "ZZZZZZ",
});
check("unknown referral code accepted but not stored", c.status === 201, `status ${c.status}`);
check("takes the next position", c.json?.signup?.waitlistPosition === base + 3,
  `expected ${base + 3}, got ${c.json?.signup?.waitlistPosition}`);

// 6 — the age gate is enforced server-side, not just in the browser
const under = await post("/api/signup", {
  email: email("teen"), name: "Teen", phone: "5555550100",
  ageConfirmed: false, termsAgreed: true,
});
check("ageConfirmed false → 403", under.status === 403, `status ${under.status}`);

// 7 — an eligible signup cannot skip the agreement
const noTerms = await post("/api/signup", {
  email: email("noterms"), name: "No Terms", phone: "5555550100",
  ageConfirmed: true, termsAgreed: false,
});
check("eligible signup without terms → 400", noTerms.status === 400, `status ${noTerms.status}`);

// 7b — a malformed phone number is rejected, not silently stored
const badPhone = await post("/api/signup", {
  email: email("badphone"), name: "Bad Phone", phone: "12345",
  ageConfirmed: true, termsAgreed: true,
});
check("malformed phone → 400", badPhone.status === 400, `status ${badPhone.status}`);

// 8 — the return visit reports the place in line held by that code
const status = await fetch(`${BASE}/status/${codeA}`);
// React separates adjacent text nodes with <!-- --> in server-rendered markup.
const html = (await status.text()).replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ");
check("status page renders", status.status === 200, `status ${status.status}`);
check("status page shows the place in line", /Your place in line/i.test(html));
check("status page shows the position", html.includes(`#${(base + 1).toLocaleString("en-US")}`));

// 9 — links shared before the programme was withdrawn still resolve
const redirect = await fetch(`${BASE}/r/${codeA?.toLowerCase()}`, { redirect: "manual" });
const location = redirect.headers.get("location") ?? "";
check("/r/code redirects", redirect.status === 307, `status ${redirect.status}`);
check("redirect normalises the code to uppercase", location.includes(`ref=${codeA}`), location);

// 10 — an unknown code is a 404, not an empty success page
const missing = await fetch(`${BASE}/status/ZZZZZZ`);
check("unknown status code → 404", missing.status === 404, `status ${missing.status}`);

const failed = results.filter((pass) => !pass).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
if (failed) process.exitCode = 1;
