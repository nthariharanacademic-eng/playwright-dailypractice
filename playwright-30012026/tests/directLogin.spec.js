import { test, request } from '@playwright/test';

const login_payload = { userEmail: "newtest123@test.com", userPassword: "Testid@123$" };
let token;
/** @type {import('@playwright/test').BrowserContext}  */
//let contextWithTkn;

test.beforeAll("Get Token", async ({ browser }) => {
    const api = await request.newContext();
    const apiResponse = await api.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: login_payload
    });
    const json_apiResponse = await apiResponse.json();
    token = json_apiResponse.token;
    console.log(token);

    // contextWithTkn = await browser.newContext();
    // await contextWithTkn.addInitScript(val =>{
    //     window.localStorage.setItem("token",val),
    //     token
    // });

});


test("Direct Login @DIRECT", async ({ browser }) => {


    const contextWithTkn = await browser.newContext();
    console.log("token inside test", token);
    await contextWithTkn.addInitScript(val => {
        window.localStorage.setItem("token", val)
    },
        token
    );

    const page = await contextWithTkn.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState("domcontentloaded");
    await page.locator(".card-body b").last().waitFor();
    console.log(await page.title());
    await contextWithTkn.close();
});