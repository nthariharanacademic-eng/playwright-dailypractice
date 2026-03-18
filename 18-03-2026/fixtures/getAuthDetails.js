const base = require('@playwright/test');
const { expect } = base;

exports.test = base.test.extend({
    loginDetails:
        /*** @param {{request : import('@playwright/test').APIRequestContext}} */
        async ({ request }, use) => {
            const TOKENURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
            const login_payload = { userEmail: process.env.MAIL_ID, userPassword: process.env.PWD };

            const loginResponse = await request.post(TOKENURL, { data: login_payload });
            expect(loginResponse.ok()).toBeTruthy();

            const json_loginResponse = await loginResponse.json();
            expect(json_loginResponse.message).toMatch(/login successfull/i);
            const token = json_loginResponse.token;
            const userId = json_loginResponse.userId;
            await use({ token, userId });

        },

    orderId: 
    /*** @param {{request : import('@playwright/test').APIRequestContext}} */
    async ({ loginDetails , request}, use) => {
        const ORDERURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
        const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

        const orderResponse = await request.post(ORDERURL,{
            data : orderPayload,
            headers:{
                Authorization : loginDetails.token
            }
        });

        expect(orderResponse.ok()).toBeTruthy();
        const json_orderResponse = await orderResponse.json();
        expect(json_orderResponse.message).toMatch(/order placed successfully/i);
        const orderId = json_orderResponse.orders[0];
        await use(orderId);

    },

    authenticatedPage : 
    /*** @param {{browser : import('@playwright/test').Browser}} */
    async({ loginDetails , browser},use)=>{
        const context = await browser.newContext();
        await context.addInitScript((val)=>window.localStorage.setItem('token',val),loginDetails.token);
        const page = await context.newPage();
        await use(page);
        //Cleanup
        await context.close();

    }
});

exports.expect = base.expect;