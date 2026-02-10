import {test} from '@playwright/test';

test("signin @sign", async({browser})=>{
    const context = await browser.newContext({httpCredentials:{
        username: 'admin',
        password : 'admin'
    }});
    const page = await context.newPage();
    
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.pause();
})