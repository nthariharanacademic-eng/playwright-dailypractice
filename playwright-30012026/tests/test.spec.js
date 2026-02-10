import {test} from '@playwright/test';


test("sample @SAMPLE",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForLoadState("domcontentloaded");
    console.log(await page.title());
});