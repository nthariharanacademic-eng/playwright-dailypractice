import {test} from '@playwright/test';


test("Frame Handling @FRAME" , async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".block").last().waitFor();
    const frame1 = page.frameLocator("#courses-iframe");

    await frame1.locator(".row").last().waitFor();
    await frame1.getByRole("link",{name:"All Access Plan"}).click();
    await frame1.locator(".content-side").waitFor();
    console.log(await frame1.locator("h2").first().textContent());

});