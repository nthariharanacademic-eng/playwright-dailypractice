const {test} = require('../fixtures/getTokenFixture');
const {expect} = require('@playwright/test');

test("Direct Login with getToken Fixture @TOKENFIX" , async({getToken, browser})=>{
    const endPoint = "https://rahulshettyacademy.com/client/";
    const context = await browser.newContext();
    await context.addInitScript(val=>{
        window.localStorage.setItem('token',val)},
        getToken);
    const page = await context.newPage();
    await page.goto(endPoint);
    await expect(page.getByRole('navigation')).toBeVisible();
});
