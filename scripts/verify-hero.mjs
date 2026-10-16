import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

await fs.mkdir('artifacts/studio', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto('http://127.0.0.1:4173/Portfolio/', { waitUntil: 'networkidle' });
  await page.locator('.studio-space-image').evaluate(image => image.decode());
  assert.ok(await page.locator('.studio-atmosphere').evaluate(element => element.classList.contains('has-background')));
  const rail = page.locator('.studio-project-rail button');
  assert.equal(await rail.count(), 13);
  const titles = await rail.evaluateAll(buttons => buttons.map(button => button.getAttribute('aria-label')));
  const enlarge = page.getByRole('button', { name: 'Enlarge CHEM IS TRY screenshots' });
  await enlarge.click();
  const dialog = page.getByRole('dialog', { name: 'CHEM IS TRY' });
  assert.ok(await dialog.isVisible());
  await dialog.locator('img').evaluate(image => image.decode());
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  assert.ok(await dialog.locator('.studio-preview-image').evaluate(element => element.classList.contains('is-zoomed')));
  await dialog.getByRole('button', { name: 'Mobile', exact: true }).click();
  assert.ok((await dialog.locator('img').getAttribute('src')).endsWith('-mobile.webp'));
  await page.keyboard.press('ArrowRight');
  assert.equal(await rail.first().getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.ok(await enlarge.evaluate(button => button === document.activeElement));
  for (let index = 0; index < titles.length; index++) {
    await rail.nth(index).click();
    await page.waitForFunction(title => document.querySelector('.studio-project-panel h2')?.textContent === title, titles[index]);
    await page.waitForFunction(title => document.querySelector('.studio-laptop-screen img')?.alt.startsWith(title), titles[index]);
    const preview = page.locator('.studio-laptop-screen img');
    await preview.evaluate(image => image.decode());
    assert.match(await preview.getAttribute('alt'), new RegExp(titles[index].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(await preview.evaluate(image => image.complete && image.naturalWidth > 0));
    assert.equal(await page.locator('.studio-phone').count(), index < 8 ? 1 : 0);
    const links = await page.locator('.studio-project-links a').evaluateAll(items => items.map(item => item.href));
    assert.ok(links.length > 0 && links.every(link => link.startsWith('https://')));
  }
  await page.getByRole('button', { name: 'Next project', exact: true }).click();
  assert.equal(await rail.first().getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Previous project', exact: true }).click();
  assert.equal(await rail.last().getAttribute('aria-pressed'), 'true');
  await rail.last().focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await rail.first().getAttribute('aria-pressed'), 'true');
  for (const [width, height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1598,767]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(800);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
    if (width >= 1440) assert.ok((await page.locator('#home').boundingBox()).height <= height, 'Desktop hero exceeds first viewport');
    await page.locator('#home').screenshot({ path: `artifacts/studio/hero-${width}.png` });
  }
  await page.locator('.studio-stage').dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 300, clientY: 300 });
  await page.locator('.studio-stage').dispatchEvent('pointerup', { pointerType: 'touch', clientX: 180, clientY: 302 });
  assert.equal(await rail.nth(1).getAttribute('aria-pressed'), 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.studio-laptop-float').evaluate(element => getComputedStyle(element).animationName), 'none');
  const invalidAnchors = await page.locator('#home a[href^="#"]').evaluateAll(links => links.filter(link => !document.querySelector(link.getAttribute('href'))).length);
  assert.equal(invalidAnchors, 0);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#home').getAttribute('data-active'), 'false');
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.studio-nav-links a[href="#projects"]').click();
  await page.waitForFunction(() => location.hash === '#projects');
  await page.locator('.studio-nav-links a[href="#experience"]').click();
  await page.waitForFunction(() => location.hash === '#experience');
  assert.equal(await page.locator('#island-links a[href="#experience"]').getAttribute('aria-current'), 'location');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await page.locator('#island-links a[href="#skills"]').click();
  await page.waitForFunction(() => location.hash === '#skills');
  assert.equal(await page.getByRole('button', { name: 'Open navigation', exact: true }).getAttribute('aria-expanded'), 'false');
  assert.deepEqual(errors, []);
  console.log('PASS: 13 project previews, valid links, wrap, keyboard, touch gesture handling, six viewport sizes, reduced motion, anchors, offscreen pause, no runtime errors.');
} finally {
  await browser.close();
}
