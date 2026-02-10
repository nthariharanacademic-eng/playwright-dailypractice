import { test, expect } from '@playwright/test';


test("Handling Dialog Box @DIA", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".block").last().waitFor();
    await page.getByPlaceholder("Enter Your Name").fill("Test");

    page.on('dialog', dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toEqual("Hello Test, share this practice page and share your knowledge");
        dialog.accept();
    });

    await Promise.all([
        page.waitForEvent('dialog'),
        page.getByRole("button", { name: "Alert" }).click()
    ]);


});

/*** Completed in under 10 mins */