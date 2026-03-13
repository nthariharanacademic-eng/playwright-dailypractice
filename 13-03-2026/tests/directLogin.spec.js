const {test,expect} = require('@playwright/test');
let token;

test.beforeAll(async ({request})=>{;
    const tokenEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const loginPayload ={userEmail:process.env.MAILID,userPassword:process.env.PWD};
    const getToken = await request.post(tokenEndPoint,{
        data : loginPayload
    });

    expect(getToken.ok()).toBeTruthy();
    const json_getToken = await getToken.json();
    expect(json_getToken.message).toMatch('Login Successfull');
    token = json_getToken.token;   

})

test("Direct Login @DIRECT" , async()=>{
    console.log("Token =>", token);

})