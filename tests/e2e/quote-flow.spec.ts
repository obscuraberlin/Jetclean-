import { expect, test } from '@playwright/test';

test.describe('Angebots-Flow', () => {
  test('Modal öffnet über den Header-CTA, ist zugänglich und schließt mit Escape', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    if (isMobile) {
      await page.getByRole('button', { name: 'Kostenloses Angebot erhalten' }).first().click();
    } else {
      await page.getByRole('button', { name: 'Kostenloses Angebot', exact: true }).first().click();
    }
    const dialog = page.getByRole('dialog', { name: /Kostenloses Reinigungsangebot/ });
    await expect(dialog).toBeVisible();
    await expect(page.locator('#app-root')).toHaveAttribute('inert', '');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page.locator('#app-root')).not.toHaveAttribute('inert', '');
  });

  test('Validierung verhindert leere Schritte und zeigt Fehlermeldungen', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/kontakt');
    const form = page.getByTestId('quote-form');
    await expect(form).toHaveAttribute('data-step', '1');

    await form.getByTestId('quote-next').click();
    await expect(form.getByRole('alert')).toContainText('Bitte wählen Sie eine Option aus.');
    await expect(form).toHaveAttribute('data-step', '1');

    // Auswahl per Tastatur -> kein Auto-Advance, dann „Weiter"
    await form.getByRole('radio', { name: 'Büro', exact: true }).focus();
    await page.keyboard.press('Space');
    await form.getByTestId('quote-next').click();
    await expect(form).toHaveAttribute('data-step', '2');

    // Auswahl per Klick -> automatisch weiter
    await form.getByText('250 – 500 m²', { exact: true }).click();
    await expect(form).toHaveAttribute('data-step', '3');
    await form.getByText('Wöchentlich', { exact: true }).click();
    await expect(form).toHaveAttribute('data-step', '4');

    await form.getByLabel('Postleitzahl').fill('123');
    await form.getByTestId('quote-next').click();
    await expect(form.getByRole('alert')).toContainText('fünfstellige Postleitzahl');
    await form.getByLabel('Postleitzahl').fill('10115');
    await form.getByTestId('quote-next').click();
    await expect(form).toHaveAttribute('data-step', '5');

    await form.getByTestId('quote-submit').click();
    await expect(form.getByRole('alert').first()).toContainText('Firmennamen');
    await expect(form).toHaveAttribute('data-step', '5');
    test.info().annotations.push({ type: 'device', description: isMobile ? 'mobile' : 'desktop' });
  });

  test('vollständiger Flow endet im Success-State', async ({ page }) => {
    await page.goto('/kontakt');
    const form = page.getByTestId('quote-form');
    await form.getByText('Praxis', { exact: true }).click();
    await expect(form).toHaveAttribute('data-step', '2');
    await form.getByText('unter 250 m²', { exact: true }).click();
    await expect(form).toHaveAttribute('data-step', '3');
    await form.getByText('Täglich', { exact: true }).click();
    await expect(form).toHaveAttribute('data-step', '4');
    await form.getByLabel('Postleitzahl').fill('10117');
    await form.getByTestId('quote-next').click();
    await expect(form).toHaveAttribute('data-step', '5');

    await form.getByLabel('Firma').fill('Playwright Test GmbH');
    await form.getByLabel('Vor- und Nachname').fill('Test Person');
    await form.getByLabel('E-Mail').fill('test@example.com');
    await form.getByLabel('Telefon').fill('030 1234567');
    await form.getByLabel(/Datenschutzerklärung/).check();

    // Mindest-Ausfüllzeit (Bot-Schutz) abwarten
    await page.waitForTimeout(3200);
    await form.getByTestId('quote-submit').click();
    await expect(page.getByTestId('quote-success')).toContainText('Vielen Dank', {
      timeout: 15_000,
    });
  });
});
