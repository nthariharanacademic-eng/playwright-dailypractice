const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('.//Utils//APIUtils');

const login_data = { userEmail: "newtest123@test.com", userPassword: "Testid@123$" };
const order_data = { "orders": [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
let token, order_id;


test.beforeAll(async () => {

    const APIContext = await request.newContext();
    const api = new APIUtils(APIContext);
    token = await api.getToken(login_data);
    order_id = await api.createOrder(order_data);
    console.log("*** Order id -", order_id);

});



test("Network  intercept @NET2", async ({ page }) => {

    const mail_id = "newtest123@test.com";
    const pwd = "Testid@123$";
    const tgt_product = "iphone 13 pro";
    const login_section = page.locator(".login-section-wrapper");
    const txt_mailid = page.getByPlaceholder("email@example.com");
    const txt_pwd = page.getByPlaceholder("enter your passsword");
    const btn_login = page.getByRole("button", { name: "login" });
    const prod_list = page.locator(".row .card");
    const btn_MyOrders = page.locator('ul li [routerlink="/dashboard/myorders"]');
    const table_OrderRow = page.locator("tbody tr");
    const empty_response = { "data": [], "message": "No Orders" };
    let mock_body = JSON.stringify(empty_response);


    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route =>{
        let modified_url=route.request().url();
        modified_url = modified_url+"1a3";
        route.continue({url: modified_url});
   });


   await page.route("**/*.{css,jpg,jpeg,png}" , route => {
    route.abort();
   });

   await page.goto("https://rahulshettyacademy.com/client/");
   
   await page.pause();

//     await btn_MyOrders.click();
//     await table_OrderRow.last().waitFor();
//     await table_OrderRow.filter({ hasText: `${order_id}` }).getByRole('button', { name: "View" }).click();

//    //await page.pause();
//    expect(await page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
});