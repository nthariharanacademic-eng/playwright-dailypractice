import {test,expect} from '@playwright/test';

test("Dailog Box @DIA", async({page})=>{
    
    /**Listener for dialogbox */
    page.on('dialog',dialog=>{
        dialog.accept();
        console.log(dialog.message());
    });

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // expect(page.getByRole("textbox",{name:/enter your name/i})).toBeVisible();
    // await page.getByRole("textbox",{name:/enter your name/i}).fill("Test");
    // await page.getByRole("button",{name:/alert/i}).click();

    await page.getByLabel(/radio1/i).click();
    await page.pause();
    
});