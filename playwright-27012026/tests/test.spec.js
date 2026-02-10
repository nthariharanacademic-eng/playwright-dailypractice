import {test} from '@playwright/test'


test('Sample', async({page})=>{
    await page.goto("https://google.com");
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
});