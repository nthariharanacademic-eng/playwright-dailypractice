const { test } = require('@playwright/test');



test("@EX1 check new tab", async ({ page }) => {

    const context = page.context();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#login-form").waitFor();
    await page.locator(".blinkingText").isVisible();

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator(".blinkingText").click()

    ]);

    await newpage.locator(".blockquote-para").waitFor();
    console.log("****");
    console.log(await newpage.title());
    console.log(await newpage.locator("p.red").textContent());






});