const{test,expect,request} = require('@playwright/test');

test("Create Order Using API Call @APIORDER", async()=>{

    const api = await request.newContext();
    const tokenEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const orderEndPoint = "https://rahulshettyacademy.com/api/ecom/order/create-order";
    const login_payload ={userEmail: process.env.MAILID,userPassword: process.env.PWD};
    const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

    const apiResp = await api.post(tokenEndPoint,{
           data :  login_payload
    });
    
    expect(apiResp.ok()).toBeTruthy();
    const json_apiResp = await apiResp.json();
    const token = json_apiResp.token;
    expect(json_apiResp.message).toMatch(/Login Successfull/i);
    
    const orderApiResp = await api.post(orderEndPoint,{
        data: orderPayload,
        headers:{
            'Authorization' : token
        }
    });

    expect(orderApiResp.ok()).toBeTruthy();
    const json_orderApiResp = await orderApiResp.json();
    expect(json_orderApiResp.message).toMatch('Order Placed Successfully');
    const orderId = json_orderApiResp.orders[0];
    console.log("Order id =>", orderId);
});