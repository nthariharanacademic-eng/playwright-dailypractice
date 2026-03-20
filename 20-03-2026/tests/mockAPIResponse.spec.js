const { test, expect } = require('../fixtures/AuthPage');

test.describe('Mock API Response', async () => {
    test("Mock API Response @MOCK",
        /*** @param {{authPage : import('@playwright/test').Page}} */
        async ({ authPage }) => {
            const BASEURL = 'https://rahulshettyacademy.com/client/';
            const ORDERSURL = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';
            
            await test.step("API Request Listener", async()=>{
                authPage.route(ORDERSURL,async (route,request)=>{
                    let origResponse = await route.fetch();
                    const mockResp ={"data":[],"message":"No Orders"};
                    await route.fulfill({
                        body : JSON.stringify(mockResp),
                        headers : origResponse.headers(),
                        status : origResponse.status()
                    });
                });
            });


            await test.step('Navigate to Site', async () => {
                await authPage.goto(BASEURL);
            });

            const navbar = authPage.getByRole('navigation');
            const navbar_Orders = navbar.getByRole('button',{name:/orders/i});
            const noOrdersMsg = authPage.getByText(' You have No Orders to show at this time. Please Visit Back Us ');

            await test.step("Assert the Home page element", async()=>{
                await expect(navbar).toBeVisible();
            });

            await test.step("Click on ORDERS menu in the NavBar", async()=>{
                await navbar_Orders.click();
            });

            await test.step("Check for End User Message after API response is mocked", async()=>{
                await expect(noOrdersMsg).toBeVisible();
            });

        });
});