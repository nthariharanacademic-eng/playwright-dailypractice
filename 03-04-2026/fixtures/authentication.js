const base = require('@playwright/test');
const { json } = require('node:stream/consumers');
const { expect } = base;


exports.test = base.test.extend({
    token:
        /*** @param {{request : import('@playwright/test').APIRequestContext}} */
        async ({ request }, use) => {
            const TOKENURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
            const login_payload = { userEmail: process.env.MAIL_ID, userPassword: process.env.PWD };

            const getTokenResp = await request.post(TOKENURL, { data: login_payload });

            expect(getTokenResp.ok()).toBeTruthy();
            const json_getTokenResp = await getTokenResp.json();
            expect(json_getTokenResp.message).toMatch(/login successfull/i);
            await use(json_getTokenResp.token);

        },
    orderId:
        /*** @param {{request : import('@playwright/test').APIRequestContext}} */
        async ({ request, token }, use) => {
            const ORDERURL = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
            const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
            const getOrderResp = await request.post(ORDERURL, {
                data: orderPayload,
                headers: {
                    'Authorization': token
                }
            });

            expect(getOrderResp.ok()).toBeTruthy();
            const json_getOrderResp = await getOrderResp.json();
            expect(json_getOrderResp.message).toMatch(/order placed successfull/i);
            await use(json_getOrderResp.orders[0]);

        }
});

exports.expect = base.expect;

