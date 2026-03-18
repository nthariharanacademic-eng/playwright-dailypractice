const { test, expect } = require('../fixtures/getAuthDetails');

test.describe("Interpret API Request and Modify the Request URL", async () => {
    test("Interpret API Request @INTER",
        /** @param {{authenticatedPage : import('@playwright/test').Page}} */
        async ({ authenticatedPage }) => {

            const endPoint = "https://rahulshettyacademy.com/client/#/dashboard/dash";
            const ordersURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*"

            await test.step("Listener for API request", async () => {
                authenticatedPage.route(ordersURL, async (route, request) => {
                    let origURL = request.url();
                    let mockURL = origURL.replace(/.{3}$/, "123");
                    await route.continue({ url: mockURL });
                });
            });


            await test.step("Navigate to Site", async () => {
                await authenticatedPage.goto(endPoint);
            });

            const navbar = authenticatedPage.getByRole('navigation');
            const orders = navbar.getByRole('button', { name: /orders/i });

            await test.step("Navigate to Orders menu", async () => {
                await expect(navbar).toBeVisible();
                await orders.click();
            });

            await test.step("Click on any view orders link", async()=>{
                await authenticatedPage.getByRole('button',{name:/view/i}).first().click();
            });

            await test.step("Verify Error is displayed", async()=>{
                await expect(authenticatedPage.getByText(/you are not authorize to view this order/i)).toBeVisible();
            });

        });
});
