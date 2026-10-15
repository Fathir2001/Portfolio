import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 768, 1101, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:4173/Portfolio/', { waitUntil: 'networkidle' });
    const nav = page.locator('.nav-island');
    const before = await nav.boundingBox();
    if (width < 1101) {
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      assert.ok(await page.locator('#island-links').isVisible());
    } else {
      assert.ok(await page.locator('.island-trigger').isHidden());
      assert.ok(await page.locator('#island-links').isHidden());
    }
    const visibleControlsFit = await nav.evaluate(header => {
      const bounds = header.getBoundingClientRect();
      return [...header.querySelectorAll('a, button')].filter(el => el.getClientRects().length).every(el => {
        const box = el.getBoundingClientRect();
        const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
        return box.left >= bounds.left && box.right <= bounds.right + 1 && box.bottom <= bounds.bottom + 1 && el.contains(hit);
      });
    });
    assert.ok(visibleControlsFit, `Overlapping or clipped navbar controls at ${width}`);
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('#island-links').isHidden());
    if (width < 1101) await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    await page.locator(`${width < 1101 ? '#island-links' : '.studio-nav-links'} a[href="#experience"]`).click();
    await page.waitForFunction(() => location.hash === '#experience');
    assert.equal(await page.locator('#island-links a[href="#experience"]').getAttribute('aria-current'), 'location');
    assert.ok(await page.locator('#island-links').isHidden());
    if (width >= 1101) {
      assert.ok(await page.locator('.studio-nav-links').isVisible());
      assert.ok(Math.abs((await nav.boundingBox()).width - before.width) < 1);
    }
    if (width < 1101) {
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      await page.mouse.click(10, 400);
    }
    assert.ok(await page.locator('#island-links').isHidden());
  }
  console.log('PASS: navbar controls unobstructed at five widths; Escape, outside click, menu selection, active state, and stable desktop width.');
} finally { await browser.close(); }
