const { test, expect } = require('@playwright/test');

test.beforeAll(async () => {
    const api = await request.newContext();
    const tokenEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    
    const login_payload = { userEmail: process.env.MAILID, userPassword: process.env.PWD };
    const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

    const apiResp = await api.post(tokenEndPoint, {
        data: login_payload
    });

    expect(apiResp.ok()).toBeTruthy();
    const json_apiResp = await apiResp.json();
    const token = json_apiResp.token;
    expect(json_apiResp.message).toMatch(/Login Successfull/i);
});


test("Direct Login with Token @DIRECT", async ({ browser }) => {

});