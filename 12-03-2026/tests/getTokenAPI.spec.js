const {test,expect,request} = require('@playwright/test');


test("Get Token Via API Call @GETTOKEN", async()=>{
    
    const api = await request.newContext();
    const endPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const login_payload ={userEmail: process.env.MAILID,userPassword: process.env.PWD};
    const apiResp = await api.post(endPoint,{
           data :  login_payload
    });

    expect(apiResp.ok()).toBeTruthy();
    const json_apiResp = await apiResp.json();
    const token = json_apiResp.token;
    expect(json_apiResp.message).toMatch(/Login Successfull/i);
    console.log(token);

});