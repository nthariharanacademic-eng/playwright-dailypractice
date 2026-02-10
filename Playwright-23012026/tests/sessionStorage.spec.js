import {test} from '@playwright/test';
import { Session } from 'node:inspector';
const mail_id = "newtest123@test.com";
const pwd = "Testid@123$";

test.beforeAll( async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".login-section-wrapper").waitFor();
    await page.getByPlaceholder("email@example.com").fill(mail_id);
    await page.getByPlaceholder("enter your passsword").fill(pwd);
    await page.getByRole("button",{name: "Login"}).click();
    //await page.waitForLoadState("domcontentloaded");
    await page.locator(".row").last().waitFor();
    await context.storageState({path:'state.json'});
});


test("Session Storage @STORAGE", async({browser})=>{
    const context = await browser.newContext({storageState:'state.json'});
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.pause();
    
});