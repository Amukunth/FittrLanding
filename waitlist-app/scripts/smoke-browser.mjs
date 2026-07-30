import { chromium } from "playwright";

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3111";
const results = [];
const check = (name, pass, detail) => {
  results.push(pass);
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  → " + detail : ""}`);
};

const browser = await chromium.launch();
const stamp = Date.now();
let n = 0;
const email = () => `beh${stamp}-${n++}@example.com`;

async function toStep(page, target) {
  await page.goto(`${BASE}/join`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Get started" }).click();
  if (target === "email") return;
  await page.locator('input[type="email"]').fill(email());
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(700);
  if (target === "age") return;
  await page.getByRole("button", { name: /Yes, I'm 18/ }).click();
  await page.waitForTimeout(300);
  if (target === "state") return;
  await page.locator("select").selectOption("California");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(300);
  if (target === "name") return;
  await page.locator('input[autocomplete="name"]').fill("Alex Rivera");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(300);
  if (target === "interests") return;
  // Both optional steps label the action "Skip this one" until answered.
  await page.getByRole("button", { name: /Continue|Skip this one/ }).click();
  await page.waitForTimeout(300);
  if (target === "source") return;
  await page.getByRole("button", { name: /Continue|Skip this one/ }).click();
  await page.waitForTimeout(300);
}

// 1 — the question heading takes focus on every step change
{
  const page = await browser.newPage();
  await toStep(page, "age");
  const focused = await page.evaluate(() => document.activeElement?.tagName);
  check("step change moves focus to the heading", focused === "H1", `focused <${focused}>`);
  await page.close();
}

// 2 — Enter in the email field submits the step
{
  const page = await browser.newPage();
  await toStep(page, "email");
  await page.locator('input[type="email"]').fill(email());
  await page.locator('input[type="email"]').press("Enter");
  await page.waitForTimeout(900);
  const heading = await page.locator("h1").first().innerText();
  check("Enter submits the email step", /18 OR OLDER/i.test(heading), heading);
  await page.close();
}

// 3 — Back preserves earlier answers
{
  const page = await browser.newPage();
  await toStep(page, "name");
  await page.locator('input[autocomplete="name"]').fill("Sam Okafor");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(400);
  const value = await page.locator('input[autocomplete="name"]').inputValue();
  check("Back preserves the answer", value === "Sam Okafor", `got "${value}"`);
  await page.close();
}

// 4 — terms submit is gated on the checkbox
{
  const page = await browser.newPage();
  await toStep(page, "terms");
  const before = await page.getByRole("button", { name: /Claim my place/ }).isDisabled();
  await page.getByRole("checkbox").check();
  await page.waitForTimeout(150);
  const after = await page.getByRole("button", { name: /Claim my place/ }).isDisabled();
  check("submit disabled until terms are ticked", before === true && after === false,
    `before=${before} after=${after}`);
  await page.close();
}

// 5 — reduced motion actually removes the transitions
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/join`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Get started" }).click();
  await page.waitForTimeout(120);
  const duration = await page.evaluate(() => {
    const el = document.querySelector('[class*="animate-step"]');
    return el ? getComputedStyle(el).animationDuration : "none";
  });
  // getComputedStyle normalises to seconds, so 0.01ms comes back as 1e-05s.
  const seconds = parseFloat(duration);
  check(
    "reduced motion collapses the step animation",
    Number.isFinite(seconds) && seconds < 0.001,
    duration,
  );
  await ctx.close();
}

// 6 — every control has an accessible name
{
  const page = await browser.newPage();
  await toStep(page, "interests");
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll("button, input, select, a")].filter((el) => {
      const name =
        el.getAttribute("aria-label") ||
        el.textContent?.trim() ||
        (el.labels?.length ? [...el.labels].map((l) => l.textContent).join("") : "");
      return !name;
    }).length,
  );
  check("no unnamed interactive controls", unnamed === 0, `${unnamed} unnamed`);
  await page.close();
}

// 7 — the honeypot for hydration: no console errors anywhere in the flow
{
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await toStep(page, "terms");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Claim my place/ }).click();
  await page.waitForTimeout(1500);
  check("no console errors through the whole flow", errors.length === 0, errors.join(" | ").slice(0, 200));
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
if (failed) process.exitCode = 1;
