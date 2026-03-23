const {test,expect} = require('../fixtures/Authentication');


test("Mock API Response @MOCK" , 
    /*** @param {{ authPage : import('@playwright/test').Page }} */
    async({authPage})=>{
    const endPoint = "https://rahulshettyacademy.com/client/";
    const ORDERSURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
    const noOrdersResp ={data:[],message:"No Orders"};
    await authPage.goto(endPoint);

     /**
     * Listener
     */
    authPage.route(ORDERSURL,async (route,request)=>{
        let origResponse = await route.fetch();
        await route.fulfill({
            body : JSON.stringify(noOrdersResp),
            contentType : origResponse.headers(),
            response : origResponse
        });
    });

    const navbar = authPage.getByRole('navigation');
    const orders_navbar = navbar.getByRole('button', {name : /orders/i});

    await expect(navbar).toBeVisible();
    await orders_navbar.click();

    await expect(authPage.getByText("you have no orders")).toBeVisible();

})