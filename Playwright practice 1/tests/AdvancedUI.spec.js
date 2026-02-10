const { test, expect } = require('@playwright/test');

test("More UI validations @ADVUI", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", { name: "Hide" }).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    await page.getByRole("button", { name: "Show" }).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole("button", { name: "Confirm" }).click();

    await page.getByRole("button", { name: "Mouse Hover" }).hover();
    await page.locator('.mouse-hover-content a:has-Text("Reload")').click();

    const framespage = page.frameLocator('[name="iframe-name"]');
    //await page.pause();
    console.log(await framespage.locator(".count-text").nth(0).textContent());
    await framespage.getByRole('link',{name :"All Access Plan"}).click();

    console.log(await framespage.locator(".text h2 span").textContent());
});