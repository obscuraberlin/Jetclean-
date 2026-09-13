import { expect, test } from '@playwright/test';

test.describe('Interaktionen', () => {
  test('Leistungs-Carousel lässt sich per Buttons und Tastatur steuern', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    const track = page.getByTestId('services-carousel');
    await track.scrollIntoViewIfNeeded();
    await expect(track).toBeVisible();

    const next = page.getByTestId('carousel-next').locator('visible=true').first();
    const prev = page.getByTestId('carousel-prev').locator('visible=true').first();
    await expect(prev).toBeDisabled();

    const before = await track.evaluate((el) => el.scrollLeft);
    await next.click();
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before);
    await expect(prev).toBeEnabled();

    if (!isMobile) {
      await track.focus();
      const mid = await track.evaluate((el) => el.scrollLeft);
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(mid);
    }
  });

  test('Vorher/Nachher-Regler reagiert auf Tastatur und Pointer', async ({ page }) => {
    await page.goto('/');
    const slider = page.getByTestId('before-after');
    await slider.scrollIntoViewIfNeeded();
    const handle = page.getByTestId('before-after-handle');
    await expect(handle).toHaveAttribute('aria-valuenow', '50');

    await handle.focus();
    await page.keyboard.press('ArrowRight');
    await expect(handle).toHaveAttribute('aria-valuenow', '52');
    await page.keyboard.press('End');
    await expect(handle).toHaveAttribute('aria-valuenow', '100');

    const box = await slider.boundingBox();
    if (!box) throw new Error('Slider nicht sichtbar');
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 4 });
    await page.mouse.up();
    const value = Number(await handle.getAttribute('aria-valuenow'));
    expect(value).toBeGreaterThan(20);
    expect(value).toBeLessThan(40);
  });

  test('Mobile Navigation öffnet, ist fokussierbar und schließt', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'nur Mobile');
    await page.goto('/');
    const toggle = page.getByTestId('menu-toggle');
    await toggle.click();
    const nav = page.getByTestId('mobile-nav');
    await expect(nav).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link', { name: 'Leistungen' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Sticky Mobile-CTA erscheint nach dem Scrollen und verschwindet am Footer', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'nur Mobile');
    await page.goto('/');
    const cta = page.getByTestId('mobile-cta');
    await expect(cta).toBeHidden();
    await page.mouse.wheel(0, 900);
    await expect(cta).toBeVisible();
    await page.getByTestId('footer').scrollIntoViewIfNeeded();
    await expect(cta).toBeHidden();
  });

  test('Unterseiten laden mit Breadcrumbs', async ({ page }) => {
    for (const path of ['/leistungen/bueroreinigung', '/branchen', '/referenzen', '/ueber-uns']) {
      await page.goto(path);
      await expect(page.getByRole('navigation', { name: 'Brotkrumen' })).toBeVisible();
      expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1);
    }
    await page.goto('/gibt-es-nicht');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Diese Seite gibt es nicht',
    );
  });
});
