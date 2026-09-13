import { expect, test } from '@playwright/test';

test.describe('Rückruf anfordern', () => {
  test('validiert leere Felder und endet im Erfolgszustand', async ({ page }) => {
    await page.goto('/kontakt#rueckruf');
    const form = page.getByTestId('callback-form');
    await expect(form).toBeVisible();

    await form.getByTestId('callback-submit').click();
    await expect(form.getByText('Bitte geben Sie Ihren Namen an.')).toBeVisible();
    await expect(form.getByText('Bitte geben Sie eine Telefonnummer an.')).toBeVisible();

    await form.getByLabel('Ihr Name').fill('Erika Mustermann');
    await form.getByLabel('Telefon').fill('030 123456');
    await form.getByLabel('PLZ des Objekts').fill('10115');
    await form.getByLabel('Wann passt es Ihnen?').selectOption('morning');
    await form.getByText('Ich stimme der Verarbeitung').click();

    // Mindest-Ausfüllzeit (Bot-Schutz) abwarten
    await page.waitForTimeout(3200);
    await form.getByTestId('callback-submit').click();
    await expect(page.getByTestId('callback-success')).toBeVisible({ timeout: 15000 });
  });
});
