import { test, expect } from '@playwright/test';

test('testapp2 @testapp2', async ({ page }) => {
  await page.goto('https://www.progressive.com/lp/auto-compare/?code=8016000082&zipcode=76205&src_cd=AAAGR4E3RARPY34BS2QBPAVFFX7UCACK2U&phone=80161&nd=99&own=1&nv=99&scd=Policygenius&ag=8&gad_source=7&dclid=CPyrqJqgzJIDFVeCYwYd6JMCuA');

  // Landing CTA
  if (await page.getByRole('button', { name: /get a quote/i }).isVisible()) {
    await page.getByRole('button', { name: /get a quote/i }).click();
  } else {
    await page.getByRole('button', { name: /continue/i }).click();
  }

  await expect(page.locator('.main-content')).toBeVisible();

  // Lead form
  await page.getByRole('textbox', { name: /first name/i }).fill('test123');
  await page.getByRole('textbox', { name: /last name/i }).fill('lastname');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('01/01/1990');
  await page.getByRole('textbox', { name: 'Primary email address Input' }).fill('no@spammail.com');
  await page.getByRole('button', { name: /continue/i }).click();

  await expect(page.locator('.address-form-group')).toBeVisible();
  await page.getByRole('combobox', { name: 'Street number and name' }).fill('1001 goose ln');
  await page.getByRole('button', { name: 'Ok, start my quote' }).click();

  // Vehicle selectors — use the field labels (not the "Learn more" button)
  await page.getByLabel('Year').selectOption('2026');
  await page.getByLabel('Make').selectOption('Acura');
  await page.getByLabel('Model').selectOption('Integra');
  await page.getByLabel('Vehicle use').last().selectOption('Commute (to/from work or school)');

  // Wait until the UI is unblocked between interactions
  await waitForUiUnblocked(page);

  // Checkbox: target distinctive text
  const rideshare = page.getByRole('checkbox', { name: /Ridesharing/i });
  await rideshare.check();
  await waitForUiUnblocked(page);

  // Downstream dependent fields
  await page.getByLabel('Days per week this vehicle is used to commute').selectOption('1');
  await waitForUiUnblocked(page);

  // ✅ Use exact labels and assert after fill/select to detect re-render wipes
  const miles = page.getByRole('textbox', { name: 'Miles driven to school/work one way' });
  await miles.fill('2');
  await expect(miles).toHaveValue('2'); // ensure it stuck

  await page.getByLabel('Own or lease?').selectOption('Finance');
  await waitForUiUnblocked(page);

  await page.getByLabel('How long have you had this vehicle?').selectOption('Less than 1 month');
  //expect(await page.getByLabel('How long have you had this vehicle?').inputValue()).toMatch('Less than 1 month');

  await page.getByLabel('Annual mileage').last().selectOption('4,000 - 5,999');
  //await expect(page.getByLabel('Annual mileage').last()).toHaveValue('4,000 - 5,999');

  await page.getByRole('button', { name: 'Save vehicle' }).click();
  await page.getByRole('button', { name: /continue/i }).click();
});

// Small helper to avoid interacting under the overlay or during re-render
async function waitForUiUnblocked(page) {
  const blocker = page.locator('ui-blocker#FaderBanner .ui-blocker-wrapper');
  try {
    await blocker.waitFor({ state: 'detached', timeout: 8000 });
  } catch {
    await expect(blocker).toBeHidden({ timeout: 8000 });
  }
}
