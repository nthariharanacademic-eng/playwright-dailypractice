const {test,expect} = require('../fixtures/AuthPage');


test.describe("Interpret API Request and Modify the request URL", async()=>{

    test("Interpret API Reqeust @INTER", 
        /*** @param {{authPage : import('@playwright/test').Page}} */
        async({authPage})=>{
        const BASEURL = 'https://rahulshettyacademy.com/client/';
        const navbar = authPage.getByRole('navigation');
        
        await test.step("API Request Listener", async()=>{
            authPage.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',async (route,request)=>{
                let origURL =  request.url();
                let mockURL =  origURL.replace(/.{3}$/,'123');
                await route.continue({url: mockURL});
            });
        });


        await test.step("Navigate to Site", async()=>{
            await authPage.goto(BASEURL);
            await expect(navbar).toBeVisible();
        });

        const navbar_Orders = navbar.getByRole('button', {name : /orders/i});
        const btnView = authPage.getByRole('button',{name:/view/i});
        await test.step("Navigate to ORDERS", async()=>{
            await navbar_Orders.click();
            await expect(authPage).toHaveURL(/\/myorders$/);
        });

        await test.step("View any order", async()=>{
            await expect(btnView.first()).toBeVisible();
            await btnView.first().click();
        });

        await test.step("After API Request is modified verify the display of error message", async()=>{
            await expect(authPage.getByText('you are not authorize to view')).toBeVisible();
        });

    });
});