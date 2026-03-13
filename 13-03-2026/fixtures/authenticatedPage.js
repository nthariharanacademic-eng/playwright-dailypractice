const base = require('@playwright/test');
const { expect } = base;

/***
 *  @typedef {object} myfixture
 *  @property {import('@playwright/test').Page} authenticatedPage
 */

/*** @type {import('@playwright/test').TestType<myfixture,{}>} */

exports.test = base.test.extend({
    authenticatedPage: async ({ request ,browser}, use) => {

        const TOKENURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginPayload = { userEmail: process.env.MAILID, userPassword: process.env.PWD };

        const loginResp = await request.post(TOKENURL, {
            data: loginPayload
        });

        expect(loginResp.ok()).toBeTruthy();
        const jsonLoginResp = await loginResp.json();
        expect(jsonLoginResp.message).toMatch('Login Successfully');
        const token = jsonLoginResp.token;
        
        //Add browser context
        const context = await browser.newContext();
        await context.addInitScript(val => {
            window.localStorage.setItem('token', val)
        },
            token);
        const page = await context.newPage();
        await use(page);

        //Cleanup
        await page.close();
        await context.close();
    }
});

exports.expect = base.expect;