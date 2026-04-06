const {test,expect} = require('../fixtures/authentication');

test.describe("Access token, OrderId , authPage from Fixtures", async()=>{
    test("Authentication @AUTH",
        /*** @param {{ token : string, orderId : string, authPage : import('@playwright/test').Page}} */
        async({token, orderId,authPage})=>{
        console.log("Token", token);
        console.log("OrderId =>", orderId);

        await authPage.goto('https://rahulshettyacademy.com/client/');
        await expect(authPage.getByRole('navigation')).toBeVisible();
    });
});
