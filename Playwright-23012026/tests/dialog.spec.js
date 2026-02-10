import {test, expect} from '@playwright/test';

test("Dialog @DIA", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByPlaceholder("Enter Your Name").fill("Test");

    page.on('dialog',dialog =>{
        expect(dialog.message()).toMatch("Hello Test, share this practice page and share your knowledge");
        dialog.accept();
        console.log(dialog.message());

    });

    await Promise.all([
        page.waitForEvent('dialog'),
        page.getByRole("button",{name: "Alert"}).click()
    ]);
    
});