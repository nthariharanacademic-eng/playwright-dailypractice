const {test,expect} = require('../fixtures/Authentication');


test("Interpret API Request and modify the URL @INTER", 
    /*** @param {{authPage : import('@playwright/test').Page}} */
    async({authPage})=>{
    const endPoint = "https://rahulshettyacademy.com/client/"
    const getOrdersURL = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*'
    await authPage.goto(endPoint);

    /**
     * Listener
     */
    authPage.route(getOrdersURL,async (route,request)=>{
        let origURL = request.url();
        let mockURL = origURL.replace(/.{3}$/,'123');
        await route.continue({url: mockURL});
    });

    const navbar = authPage.getByRole('navigation');
    const orders_navbar = navbar.getByRole('button', {name : /orders/i});
    const orderRows = authPage.getByRole('row');
    const orderViewBtn = orderRows.getByRole('button',{name : /view/i}).first();

    await expect(navbar).toBeVisible();
    await orders_navbar.click();

    await expect(orderRows.first()).toBeVisible();
    await orderViewBtn.click();

    await expect(authPage).toHaveURL(/\/order-details\//);

    await expect(authPage.getByText('you are not authorize to view')).toBeVisible();
});