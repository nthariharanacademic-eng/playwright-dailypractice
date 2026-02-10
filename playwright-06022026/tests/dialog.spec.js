import { test, expect } from '@playwright/test';

test("Dialog Box @DIA", async ({ page }) => {

    page.on('dialog', dialog => {
        expect(dialog.message()).toMatch("Hello Test, share this practice page and share your knowledge");
        console.log(dialog.message());
        dialog.accept();
    });

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await expect(page.getByRole('textbox', { name: "Enter Your Name" })).toBeVisible();
    await page.getByRole('textbox', { name: "Enter Your Name" }).fill("Test");
    await page.getByRole("button", { name: "Alert" }).click();
    
});