import {test,expect} from '@playwright/test';

let webcontext;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext({ignoreHTTPSErrors:true});
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".login-section-wrapper").waitFor();
    await page.getByPlaceholder("email@example.com").fill("newtest123@test.com");
    await page.getByPlaceholder("enter your passsword").fill("Testid@123$");
    await page.getByRole("button",{name:"Login"}).click();
    await page.locator(".card-body b").last().waitFor();
    
    await context.storageState({path:'state.json'});
    webcontext = await browser.newContext({storageState:'state.json'});
    await context.close();

});



test("Session Storage @STORE",async({browser})=>{
    const page2 = await webcontext.newPage();

    await page2.goto("https://rahulshettyacademy.com/client/");
    await expect(page2.locator(".card").last()).toBeVisible();

});

