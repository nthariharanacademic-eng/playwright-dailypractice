const base = require('@playwright/test');
const {expect} = base;
exports.test = base.test.extend({
    token :
    /*** @param {{ request : import('@playwright/test').APIRequestContext}} */
    async({request},use)=>{
        const TOKENURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
        const login_payload ={userEmail: process.env.MAIL_ID,userPassword: process.env.PWD};
        const tokenResp = await request.post(TOKENURL,{data : login_payload});
        expect(tokenResp.ok()).toBeTruthy();
        const json_tokenResp = await tokenResp.json();
        expect(json_tokenResp.message).toMatch(/login successfull/i);
        await use(json_tokenResp.token);
    },
    orderId : 
    /*** @param {{ request : import('@playwright/test').APIRequestContext , token: string}} */
    async({request,token}, use)=>{
       const orderURL = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
       const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

       const orderResp = await request.post(orderURL,{
            data : orderPayload,
            headers : {
                Authorization : token
            }
       });
       expect(orderResp.ok()).toBeTruthy();
       const json_orderResp = await orderResp.json();

       expect(json_orderResp.message).toMatch(/order placed successfull/i);
       await use(json_orderResp.orders[0]);
    },
    authPage : 
    /*** @param {{context : import('@playwright/test').BrowserContext, token : string}} */
    async({context,token},use)=>{
        await context.addInitScript((value)=> window.localStorage.setItem('token',value), token);
        const page = await context.newPage();
        await use(page);

        //Cleanup
        await context.close();
    }
});

exports.expect = base.expect;