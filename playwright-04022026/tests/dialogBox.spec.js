import { test, expect } from '@playwright/test';

test("Dialog Box @DIA", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".block").last().waitFor();
    await page.locator('[name="enter-name"]').fill("Test");
    
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = page.getByRole("button", { name: "Alert" }).click();

   const dialog= await dialogPromise;
    console.log(dialog.message());
    expect(dialog.message()).toMatch("Hello Test, share this practice page and share your knowledge");
    await dialog.accept();
    await clickPromise;

});