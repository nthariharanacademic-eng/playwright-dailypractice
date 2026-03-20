const {test,expect} = require('../fixtures/AuthPage');

test.describe("Get Authenticated Page via Fixtures", async()=>{
    test("Direct Login @DIR", 
        /*** @param {{authPage : import('@playwright/test').Page}} */
        async({authPage})=>{

        const BASEURL = 'https://rahulshettyacademy.com/client/#/dashboard/dash';
        const navbar = authPage.getByRole('navigation');

        await test.step("Navigate to site with fetched token.No Login needed", async()=>{
            await authPage.goto(BASEURL);
            await expect(navbar).toBeVisible();
        });
    });
})