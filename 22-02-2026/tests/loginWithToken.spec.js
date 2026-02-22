const {test,expect,request} = require('@playwright/test');
let token;

test.beforeAll('Fetch session token via API',async()=>{

    const api = await request.newContext();
    const endPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const login_payload ={ userEmail: process.env.mail , userPassword : process.env.pwd };

    const apiResponse= await api.post(endPoint,{
        data:login_payload
    });
    
    expect(apiResponse.ok()).toBeTruthy();
    const json_apiResponse = await apiResponse.json();
    token = json_apiResponse.token;
});


test('Login using Token  @DIRECT', async({browser})=>{
    
    const context = await browser.newContext();

    //Add the token fetched to the localstorage
    await context.addInitScript((val)=>{
        window.localStorage.setItem('token',val)},
        token);

    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/",{waitUntil:'domcontentloaded'});

    await expect(page.getByRole('navigation')).toBeVisible();



});
