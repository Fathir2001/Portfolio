import { chromium } from "playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const report = [];
for (const width of [390, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://127.0.0.1:4173/Portfolio/");
  await page.waitForTimeout(1200);
  for (
    let y = 0;
    y < (await page.evaluate(() => document.documentElement.scrollHeight));
    y += 650
  ) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => scrollTo(0, 0));
  for (const theme of ["light", "dark"]) {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }, theme);
    await page.screenshot({
      path: `artifacts/portfolio-${width}-${theme}.png`,
      fullPage: true,
    });
    report.push({
      width,
      theme,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open navigation" }).click();
await page.locator('#mobile-menu a[href="#projects"]').click();
if (await page.locator("#mobile-menu").count())
  throw new Error("Mobile menu did not close");
await page.getByRole("button", { name: "Academic 5", exact: true }).click();
if ((await page.locator("#projects article").count()) !== 5)
  throw new Error("Academic filtering failed");
await page.getByRole("button", { name: "Production 8", exact: true }).click();
if ((await page.locator("#projects article").count()) !== 8)
  throw new Error("Production filtering failed");
await page.getByRole("button", { name: "Send message", exact: true }).click();
if ((await page.locator('[aria-invalid="true"]').count()) !== 3)
  throw new Error("Validation failed");
await page.getByRole("button", { name: "Open navigation" }).click();
await page.keyboard.press("Escape");
if (await page.locator("#mobile-menu").count())
  throw new Error("Escape failed");
await page.locator("#projects").scrollIntoViewIfNeeded();
await page.locator("img").evaluateAll((images) =>
  Promise.all(
    images.map((image) => {
      image.loading = "eager";
      return image.decode().catch(() => {});
    }),
  ),
);
await page.route("https://api.emailjs.com/**", (route) =>
  route.fulfill({ status: 500, body: "Test failure" }),
);
await page.getByLabel("name", { exact: true }).fill("Portfolio QA");
await page.getByLabel("email", { exact: true }).fill("qa@example.com");
await page
  .getByLabel("message", { exact: true })
  .fill("This is a local mocked test; no email is sent.");
await page.getByRole("button", { name: "Send message", exact: true }).click();
await page
  .getByText("Your message could not be sent.", { exact: false })
  .waitFor();
await page.unroute("https://api.emailjs.com/**");
await page.route("https://api.emailjs.com/**", (route) =>
  route.fulfill({ status: 200, body: "OK" }),
);
await page.getByRole("button", { name: "Send message", exact: true }).click();
await page
  .getByText("Thank you! Your message was sent successfully.")
  .waitFor();
const broken = await page
  .locator("img")
  .evaluateAll((images) =>
    images.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
  );
const anchors = await page
  .locator('a[href^="#"]')
  .evaluateAll((links) =>
    links
      .map((a) => a.getAttribute("href"))
      .filter((h) => h !== "#" && !document.querySelector(h)),
  );
console.log(
  JSON.stringify(
    {
      report,
      errors,
      broken,
      anchors,
      mobileNavigation: "passed",
      filters: "passed",
      validation: "passed",
    },
    null,
    2,
  ),
);
if (
  errors.length ||
  broken.length ||
  anchors.length ||
  report.some((item) => item.overflow)
)
  throw new Error("Browser validation failed");
await Promise.race([
  browser.close(),
  new Promise((resolve) => setTimeout(resolve, 5000)),
]);
process.exit(0);
