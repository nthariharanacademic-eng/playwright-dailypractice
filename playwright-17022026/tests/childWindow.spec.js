const { test, expect } = require('@playwright/test');


test("Child Window @CHILD", async ({ page }) => {

    const pageLink = page.getByRole('link', { name: /Free Access to/ });


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(pageLink).toBeVisible();

    const [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        pageLink.click()
    ]);

    const preloader = newtab.locator('.preloader');
    const mailid = newtab.getByRole('paragraph').filter({ hasText: /email us/i });

    await expect(preloader).toBeHidden();
    console.log(await mailid.textContent());

});