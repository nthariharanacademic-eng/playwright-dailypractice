import { test, expect } from '@playwright/test';



test("Child Window Handling @CHILD", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(".blinkingText").click()

    ]);
    await newtab.waitForLoadState('domcontentloaded');
    await expect(newtab).toHaveURL("https://rahulshettyacademy.com/documents-request");
    await newtab.locator('.row').last().waitFor();
    console.log(await newtab.locator('.red').textContent());
});