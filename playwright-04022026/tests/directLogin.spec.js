import {test} from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
import userData from '../testdata/userData.json' with {type : 'json'};


test("Direct Login @DIR", async({browser})=>{
    const context = await browser.newContext({ignoreHTTPSErrors:true});
    const apiutil = await apiUtils.init();
    const token = await apiutil.getToken(userData);

    await context.addInitScript(val=>{
        window.localStorage.setItem("token",val);
    },token);

    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
   console.log(await page.title());
    await context.close();

});