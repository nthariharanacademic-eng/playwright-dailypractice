import { test, request, expect } from '@playwright/test';
import { url } from 'node:inspector';

/**Global Variable */
const login_payload = { userEmail: "newtest123@test.com", userPassword: "Testid@123$" };
const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
const mockViewResp ={data:[],message:"No Orders"};
let token, orderId;

test("API testing @API", async ({ page }) => {

    const api = await request.newContext({ ignoreHTTPSErrors: true });
    await getToken(api);
    await createOrder(api);
    await directloginWithToken(page);
    await viewIncorrectOrder(page);
    await mockResponse(page);
});

/***
 * 
 * Support Functions
 */

/**@param {import('@playwright/test').APIRequestContext} api  */

async function getToken(api) {

    const loginResponse = await api.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: login_payload
    });
    expect(loginResponse.ok);
    const jsonLoginResponse = await loginResponse.json();
    token = jsonLoginResponse.token;
   // console.log("Token =>", token);
}


/**@param {import('@playwright/test').Page} page  */
async function directloginWithToken(page) {

    /*** Listener for get order details */
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route => {
        let origURL = await route.request().url();
        let mockURL = await origURL.replace(/.{3}$/, "123");
        await route.continue({ url: mockURL });
    });

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }
        , token
    );

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState("domcontentloaded");
}

/**@param {import('@playwright/test').Page} page  */
async function createOrder(api) {
    const orderResponse = await api.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            Authorization: token
        }
    });
    expect(orderResponse.ok);
    const jsonOrderResponse = await orderResponse.json();
    orderId = jsonOrderResponse.orders[0];
    //console.log("OrderId =>", orderId);

}

/**@param {import('@playwright/test').Page} page  */
async function viewIncorrectOrder(page) {
    await page.getByRole("button", { name: "Orders" }).click();
    const rowFinder = page.getByRole("row").filter({ hasText: orderId });
    await rowFinder.getByRole("button", { name: "View" }).click();
    await expect(page.getByText("You are not authorize to view this order")).toBeVisible();
}

/**@param {import('@playwright/test').Page} page  */
async function mockResponse(page) {

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async (route,request) =>{
        const getOrderResp = await route.fetch({ignoreHTTPSErrors:true});
        await route.fulfill({
            response: getOrderResp,
            body : JSON.stringify(mockViewResp)
        });
    });

    await page.getByRole("button",{name:"Home"}).click();
    await page.getByRole("button", { name: "Orders" }).click();
    await page.locator(".container").waitFor();
    await expect (page.getByText(" You have No Orders to show at this time. Please Visit Back Us ")).toBeVisible();

    // get https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/695248aac941646b7a6cf363
    // const mockresp ={"data":[],"message":"No Orders"};
}