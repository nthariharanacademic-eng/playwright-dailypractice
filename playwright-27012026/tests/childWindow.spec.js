import { test, expect } from '@playwright/test';

test("Child Window Handling @CHILD", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator(".blinkingText").waitFor();
    const [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(".blinkingText").click()
    ]);

    await newtab.waitForLoadState("domcontentloaded");
    await newtab.locator(".row").last().waitFor();
    console.log(await newtab.locator(".red").textContent());


});
/** Completed in 15 mins. */