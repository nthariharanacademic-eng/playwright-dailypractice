const {test,expect}= require('../fixtures/getAuthDetails');


test("Direct Login @DIRECT", 
    /*** @param {{authenticatedPage : import('@playwright/test').Page}} */
    async({authenticatedPage})=>{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await expect(authenticatedPage.getByRole('navigation')).toBeVisible();
});