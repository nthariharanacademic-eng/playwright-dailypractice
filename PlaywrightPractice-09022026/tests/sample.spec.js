import {test, expect} from '@playwright/test';

test("Sample test file @SAMPLE", async({page})=>{
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google");
    console.log(await page.title());
    
});