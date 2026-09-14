import { expect, test } from '@playwright/test';

test.describe('Startseite', () => {
  test('lädt mit korrekter Struktur und ohne horizontalen Overflow', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Gebäudereinigung Berlin/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Gebäudereinigung');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow, 'Seite darf nicht horizontal scrollen').toBe(false);

    // Genau eine H1
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1);
  });

  test('enthält SEO-Metadaten und Structured Data', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /^https?:\/\/[^/]+\/?$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.some((json) => json.includes('LocalBusiness'))).toBe(true);
  });

  test('Sitemap und robots sind erreichbar', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain('/leistungen/bueroreinigung');
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain('Sitemap:');
  });

  test('FAQ-Accordion öffnet und schließt', async ({ page }) => {
    await page.goto('/');
    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();
    const second = faq.getByRole('button', { name: /Was kostet/ });
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await second.click();
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.getByRole('region', { name: /Was kostet/ })).toBeVisible();
  });

  test('alle internen Links im Footer antworten mit 200', async ({ page, request }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('footer a[href^="/"]')
      .evaluateAll((links) =>
        Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''))),
      );
    expect(hrefs.length).toBeGreaterThan(8);
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), `Link ${href}`).toBe(200);
    }
  });
});
