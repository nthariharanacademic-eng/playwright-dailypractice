const { test, expect } = require('@playwright/test');

test("JavaScript Dialog Box @DIA", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const alertSection = page.getByRole('group', { name: /Switch To Alert Example/i });
    const alertTxtBox = alertSection.getByRole('textbox');
    const alertBtn = alertSection.getByRole('button', { name: /alert/i });
    const userName = 'Test';
    const errMsg = `Hello ${userName}, share this practice page and share your knowledge`;

    //Listener
    page.on('dialog', async dialog => {
        expect(dialog.message()).toMatch(errMsg);
        console.log("Error ->", dialog.message());
        await dialog.accept();
    });

    await expect(alertSection).toBeVisible();
    await alertTxtBox.fill(userName);
    await alertBtn.click();

});