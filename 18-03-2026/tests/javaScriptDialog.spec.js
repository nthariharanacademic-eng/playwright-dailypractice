const { test, expect } = require('@playwright/test');

test.describe("Hanlding JavaScript Dialog", async () => {
    test("JavaScript Dialog Handling @DIALOG", async ({ page }) => {
        const endPoint = "https://rahulshettyacademy.com/AutomationPractice/"

        await test.step("Navigate to Site", async () => {
            await page.goto(endPoint);
        });


        const alertSection = page.getByRole('group', { name: /Switch To Alert Example/ });
        const alertTxt = alertSection.getByRole('textbox');
        const btnAlert = alertSection.getByRole('button', { name: /Alert/i });
        const userName = "Test";
        const alertMsg = `Hello ${userName}, share this practice page and share your knowledge`;

        await test.step("Listener for Dialog Box", () => {
            page.on('dialog', (dialog) => {
                console.log(dialog.message());
                expect(dialog.message()).toMatch(alertMsg);
                dialog.accept();
            });
        });

        await test.step("Verify the Alert Section visibility. Fill the Text and click on Alert", async () => {
            await expect(alertSection).toBeVisible();
            await alertTxt.fill(userName);
            await btnAlert.click();
        });


    });
});
