const { test, request,expect } = require('@playwright/test');


test("API get login Token @LOGIN", async () => {
    const api = await request.newContext();

    //Used env file to fetch username and password and they are encrypted.
    //Do not forget to add .env* to gitignore.!!!
    const login_payload ={
        userEmail:process.env.mail,
        userPassword:process.env.pwd};
    const loginEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";

    const apiResp = await api.post(loginEndPoint,{
        data: login_payload
    });

    expect(apiResp.ok());
    const json_apiResp = await apiResp.json();  //converting api response to json
    console.log(json_apiResp);
    const token = json_apiResp.token;
    console.log("Token ==> ", token);

});

/***
 * Used Dotenvx to encrypt access mail,pwd,etc. 
 */