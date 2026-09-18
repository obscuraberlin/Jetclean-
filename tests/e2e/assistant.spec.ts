import { expect, test } from '@playwright/test';

test.describe('KI-Assistent', () => {
  test('öffnet sich, beantwortet eine Frage und verlinkt Leistungen', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('assistant-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    const panel = page.getByTestId('assistant-panel');
    await expect(panel).toBeVisible();

    await page.getByTestId('assistant-input').fill('Welche Leistungen bietet ihr an?');
    await page.getByTestId('assistant-send').click();
    const log = page.getByTestId('assistant-log');
    await expect(log).toContainText(/Büroreinigung/, { timeout: 15000 });
    await expect(log.getByRole('link', { name: /Alle Leistungen/ })).toBeVisible();

    // Escape schließt das Panel
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  });

  test('Vorschlagsfrage zum Ablauf liefert die vier Schritte', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('assistant-toggle').click();
    await page.getByRole('button', { name: 'Wie läuft eine Zusammenarbeit ab?' }).click();
    await expect(page.getByTestId('assistant-log')).toContainText(/Besichtigung/, {
      timeout: 15000,
    });
  });
});
