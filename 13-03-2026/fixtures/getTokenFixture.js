const base  = require('@playwright/test');
const {expect } = require('@playwright/test');



exports.test = base.test.extend({
    getToken: async ({ request }, use) => {
        
        const tokenEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginPayload = { userEmail: process.env.MAILID, userPassword: process.env.PWD };
        const getToken = await request.post(tokenEndPoint, {
            data: loginPayload
        });

        expect(getToken.ok()).toBeTruthy();
        const json_getToken = await getToken.json();
        expect(json_getToken.message).toMatch('Login Successfull');
        const token = json_getToken.token;
        
        await use(token);
    }
});