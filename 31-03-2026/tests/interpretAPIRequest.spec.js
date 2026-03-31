const {test,expect} = require('../fixtures/authentication');


test("Interpret API Request @INTER", 
    /*** @param {{authPage : import('@playwright/test').Page }} */
    async({authPage})=>{
    const getOrdersURL = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*';
    await authPage.goto('https://rahulshettyacademy.com/client/');
    const navbar = authPage.getByRole('navigation');
    const navbar_Orders = navbar.getByRole('button', {name : /orders/i});
    const viewOrder = authPage.getByRole('button',{name: /view/i});

    /*** Listener */
    authPage.route(getOrdersURL,async (route,request)=>{
        let origURL =  request.url();
        let mockURL =  origURL.replace(/.{3}$/,"123");
        await route.continue({url:mockURL});
    });



    await expect(navbar).toBeVisible();
    await navbar_Orders.click();
    await expect(authPage).toHaveURL(/myorders$/);
    await expect(viewOrder.first()).toBeVisible();
    await viewOrder.first().click();

    await expect(authPage.getByText(/you are not authorize to view/i)).toBeVisible();
});