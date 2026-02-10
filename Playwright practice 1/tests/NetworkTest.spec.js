const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('.//Utils//APIUtils');

const login_data = { userEmail: "newtest123@test.com", userPassword: "Testid@123$" };
const order_data = {"orders":[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
let token,order_id;


test.beforeAll(async () => {

    const APIContext = await request.newContext();
    const api = new APIUtils(APIContext);
    token = await api.getToken(login_data);
    order_id = await api.createOrder(order_data);
    console.log("*** ORder id -", order_id);

});



test("Network  intercept @NET", async ({ page }) => {

    const mail_id = "newtest123@test.com";
    const pwd = "Testid@123$";
    const login_section = page.locator(".login-section-wrapper");
    const txt_mailid = page.getByPlaceholder("email@example.com");
    const txt_pwd = page.getByPlaceholder("enter your passsword");
    const btn_login = page.getByRole("button", { name: "login" });
    const prod_list = page.locator(".row .card");
    const btn_MyOrders = page.locator('ul li [routerlink="/dashboard/myorders"]');
    const empty_response = { "data": [], "message": "No Orders" };
    let mock_body = JSON.stringify(empty_response);


    await page.addInitScript( value=>{
        window.localStorage.setItem("token",value);
    }, token);


    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {

        const response = page.request.fetch(route.request(), {
            ignoreHTTPSErrors: true
        });

        route.fulfill({
            response,
            mock_body
        });
    });

    await btn_MyOrders.click();

    //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");


    await page.locator(".container").last().waitFor();

    expect(await page.locator(".container div").first()).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");

});