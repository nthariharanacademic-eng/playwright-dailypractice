import {test,expect} from '@playwright/test';

test("Frame Handling @FRAME", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".block").last().waitFor();
    const frame1 = page.frameLocator("#courses-iframe");
    
    
    await frame1.getByRole("link",{name:/All Access plan/}).click();
    await frame1.locator(".row").last().waitFor();
    await expect(frame1.getByRole("link",{name:/All Access plan/})).toBeVisible();
    await expect(frame1.locator("h2").first()).toBeVisible();
    console.log(await frame1.locator("h2").first().innerText());
});



//https://rahulshettyacademy.com/AutomationPractice/