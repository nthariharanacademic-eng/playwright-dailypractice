const {test,expect} = require('../fixtures/authenticatedPage');


test("Interpret API Request @INTER", async({authenticatedPage})=>{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");

    
    const navbar = authenticatedPage.getByRole('navigation');
    const navbarOrders = navbar.getByRole('button',{name:/orders/i});
    const GETORDERURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"

    /***
     * Listener
     */
    authenticatedPage.route(GETORDERURL, async(route,request)=>{
        console.log(request.url());
        let origURL = request.url();
        let mockURL = origURL.replace(/.{3}$/,"123");
        console.log("Orig URL => ", origURL);
        console.log("Mock URL", mockURL);
        await route.fulfill({url : mockURL});
    });


    await expect(navbar).toBeVisible();
    await navbarOrders.click();
    await expect(authenticatedPage.getByText('You have No Orders to show at this time. Please Visit Back Us')).toBeVisible();
    

});