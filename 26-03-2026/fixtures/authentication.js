const base = require('@playwright/test');
const {expect} = base;


exports.test = base.test.extend({
    token : 
    /*** @param {{request : import('@playwright/test').APIRequestContext}} */
    async({request}, use)=>{
        const TOKENURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
        const login_payload ={userEmail: process.env.MAIL_ID,userPassword:process.env.PWD};

        const tokenResponse = await request.post(TOKENURL,{data: login_payload});
        expect(tokenResponse.ok()).toBeTruthy();
        const json_tokenResponse = await tokenResponse.json();
        expect(json_tokenResponse.message).toMatch('Login Successfull'); //only partial text used.
        await use(await json_tokenResponse.token);

    },

    orderId : 
    /*** @param {{token : string, request : import('@playwright/test').APIRequestContext}} */
    async({token,request},use)=>{
        const ORDERURL = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
        const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

        const orderResponse = await request.post(ORDERURL,{
            data : orderPayload,
            headers:{
                Authorization : token
            }
        });

        expect(orderResponse.ok()).toBeTruthy();
        const json_orderResp = await orderResponse.json();
        expect(json_orderResp.message).toMatch(/order placed success/i);
        await use(json_orderResp.orders[0]);
    }
});

exports.expect = base.expect;