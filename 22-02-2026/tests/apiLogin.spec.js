const {test,expect,request} = require('@playwright/test');


test('Login using API @LOGINAPI', async()=>{
    const api = await request.newContext();
    const endPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const login_payload ={ userEmail: process.env.mail , userPassword : process.env.pwd };

    const apiResponse= await api.post(endPoint,{
        data:login_payload
    });
    
    expect(apiResponse.ok()).toBeTruthy();

    const json_apiResponse = await apiResponse.json();

    const token = json_apiResponse.token;
    console.log(" Token =>", token);
});