const {test,expect} = require('../fixtures/sessionStorage');


test.describe('Stored Session in JSON file reused', async()=>{
    test("Session Storage @SESSION",async({sessionFile,browser})=>{
        const context = await browser.newContext({storageState: sessionFile});
        const page = await context.newPage();
        const BASEURL = 'https://rahulshettyacademy.com/client/';
        
        await page.goto(BASEURL);
        const navbar = page.getByRole('navigation');


        await test.step("Assert presence of NavBar", async()=>{
            expect(navbar).toBeVisible();
        });

        await test.step("Cleanup", async()=>{
            await context.close();
        });
        
    });
});