import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
const entries = [
  ["chem-is-try", "https://chem-is-try-admin.netlify.app/"],
  ["pink-cosmetics", "https://pink-cosmetics.netlify.app/"],
  ["nandos", "https://nando-s.netlify.app/"],
  ["mi-creations", "https://mi-creations.netlify.app/"],
  ["i-touch", "https://i-touch.netlify.app/"],
  ["zyndigo", "https://zyndigo.tech/"],
  ["think-different", "https://think-different-td.netlify.app/"],
  ["hireme", "https://hireme-f.netlify.app/"],
];
await fs.mkdir("artifacts/captures", { recursive: true });
await fs.mkdir("public/images/screens", { recursive: true });
// Match the existing directory's case: GitHub Pages is case sensitive.
const output = "public/images/Projects";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const covers = JSON.parse(
  await fs.readFile("src/data/project-covers.json", "utf8"),
);
const previous = JSON.parse(
  await fs.readFile("artifacts/capture-report.json", "utf8").catch(() => "[]"),
);
const selected = process.argv.slice(2);
const results = previous.filter(
  (item) => selected.length && !selected.includes(item.id),
);
for (const [id, url] of entries.filter(
  ([id]) => !selected.length || selected.includes(id),
)) {
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  let page;
  try {
    const captures = [];
    let title, body;
    for (const [kind, width, height] of [
      ["desktop", 1440, 900],
      ["mobile", 390, 844],
    ]) {
      page = await context.newPage();
      await page.setViewportSize({ width, height });
      const response = await page.goto(url, {
        waitUntil: "load",
        timeout: 45000,
      });
      if (!response || response.status() >= 400)
        throw new Error(`HTTP ${response?.status()}`);
      // Wait for CSS backgrounds as well as <img> assets. Persistent analytics
      // connections must not prevent otherwise complete public pages being captured.
      await page
        .waitForLoadState("networkidle", { timeout: 12000 })
        .catch(() => {});
      await page.waitForTimeout(2500);
      await page.evaluate(async () => {
        const urls = new Set();
        for (const element of document.querySelectorAll("*")) {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top >= innerHeight) continue;
          for (const match of getComputedStyle(
            element,
          ).backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g))
            urls.add(match[1]);
        }
        await Promise.race([
          Promise.all(
            [...urls].map(
              (src) =>
                new Promise((resolve) => {
                  const image = new Image();
                  image.onload = image.onerror = resolve;
                  image.src = src;
                }),
            ),
          ),
          new Promise((resolve) => setTimeout(resolve, 10000)),
        ]);
      });
      await page.evaluate(() =>
        Promise.race([
          Promise.all(
            Array.from(document.images)
              .filter(
                (image) => image.getBoundingClientRect().top < innerHeight,
              )
              .map((image) => image.decode().catch(() => {})),
          ),
          new Promise((resolve) => setTimeout(resolve, 10000)),
        ]),
      );
      await page.evaluate(() => document.fonts.ready);
      title = await page.title();
      body = (await page.locator("body").innerText()).slice(0, 6000);
      if (
        /site not found|site has been suspended|account suspended/i.test(body)
      )
        throw new Error(body.slice(0, 180));
      const path = `artifacts/captures/${id}-${kind}.png`;
      await page.screenshot({ path, animations: "disabled" });
      if (["chem-is-try", "pink-cosmetics", "hireme"].includes(id)) {
        await sharp(path).resize({ width: kind === "desktop" ? 1280 : 390 }).webp({ quality: 88 }).toFile(`public/images/screens/${id}-${kind}.webp`);
      }
      captures.push(path);
      await page.close();
    }
    // Keep both complete UIs visible: the phone must never cover the laptop.
    const roundedScreen = async (path, width, height, radius) =>
      sharp(
        await sharp(path)
          .resize(width, height, { fit: "fill" })
          .png()
          .toBuffer(),
      )
        .composite([
          {
            input: Buffer.from(
              `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="white"/></svg>`,
            ),
            blend: "dest-in",
          },
        ])
        .png()
        .toBuffer();
    const desktop = await roundedScreen(captures[0], 880, 550, 6);
    const mobile = await roundedScreen(captures[1], 224, 485, 16);
    const frame = Buffer.from(
      `<svg width="1280" height="720"><defs>
      <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f0f5ff"/><stop offset="1" stop-color="#e1e9f6"/></linearGradient>
      <linearGradient id="metal" x2="0" y2="1"><stop stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
      <filter id="s" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0f172a" flood-opacity=".2"/></filter></defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <g filter="url(#s)"><rect x="46" y="86" width="908" height="584" rx="18" fill="#1e293b"/>
      <path d="M24 670H976L950 686H50Z" fill="url(#metal)"/>
      <rect x="980" y="148" width="244" height="519" rx="30" fill="#111827"/></g>
      <path d="M437 670H563L555 675H445Z" fill="#64748b"/>
      <circle cx="500" cy="96" r="3" fill="#64748b"/>
      <rect x="1085" y="154" width="34" height="3" rx="1.5" fill="#475569"/>
      </svg>`,
    );
    await sharp(frame)
      .composite([
        { input: desktop, left: 60, top: 106 },
        { input: mobile, left: 990, top: 165 },
      ])
      .webp({ quality: 90, effort: 6 })
      .toFile(`${output}/${id}-combined.webp`);
    covers[id] = `images/Projects/${id}-combined.webp`;
    results.push({ id, url, status: "captured", title, body });
    console.log(id, "captured");
  } catch (error) {
    results.push({
      id,
      url,
      status: "manual screenshot needed",
      reason: error.message,
    });
    console.log(id, error.message);
  } finally {
    await context.close();
  }
}

await fs.writeFile(
  "src/data/project-covers.json",
  JSON.stringify(covers, null, 2) + "\n",
);
await fs.writeFile(
  "artifacts/capture-report.json",
  JSON.stringify(results, null, 2) + "\n",
);

await Promise.race([
  browser.close(),
  new Promise((resolve) => setTimeout(resolve, 5000)),
]);
process.exit(0);
