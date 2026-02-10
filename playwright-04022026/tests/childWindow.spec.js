import {test,expect} from '@playwright/test';

test("Child Window @CHILD", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(page.getByRole("link",{name : /ResumeAssistance/i})).toBeVisible();
      
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole("link",{name : /ResumeAssistance/i}).click()
    ]);
    
    await popup.locator(".row").last().waitFor();
    console.log(await popup.title());
    expect(await popup.title()).toEqual("RS Academy");
    await page.bringToFront();
    await page.locator("#username").fill("Test");

});