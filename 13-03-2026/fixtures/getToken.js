const base = require('@playwright/test');
const { expect } = base;

exports.test = base.test.extend({
    token: async ({ request }, use) => {

        const TOKENURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginPayload = { userEmail: process.env.MAILID, userPassword: process.env.PWD };

        const loginResp = await request.post(TOKENURL, {
            data: loginPayload
        });

        expect(loginResp.ok()).toBeTruthy();
        const jsonLoginResp = await loginResp.json();
        expect(jsonLoginResp.message).toMatch('Login Successfully');
        const token = jsonLoginResp.token;  
        await use(token);
    }
});

exports.expect = base.expect;