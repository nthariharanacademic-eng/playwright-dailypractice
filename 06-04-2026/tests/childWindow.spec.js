const {test,expect} = require('@playwright/test');

test.describe("Child Window Handling", async()=>{
    test("@CHILD", async({page})=>{
        const ENDPOINT = "https://rahulshettyacademy.com/loginpagePractise/";
        await page.goto(ENDPOINT);

        const link = page.getByRole('link',{name:/resumeassistance/i});
        await expect(link).toBeVisible();
        const [newtab] = await Promise.all([
            page.waitForEvent('popup'),
            link.click()
        ]);
        const navbar = newtab.getByRole('navigation');
        const tgtTxt = newtab.getByText('email us');

        await newtab.waitForURL(/documents-request$/);
        await expect(navbar).toBeVisible();
        await expect(tgtTxt).toBeVisible();
        console.log(await tgtTxt.textContent());       

    });
});



