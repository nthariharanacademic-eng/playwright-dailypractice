import { test, expect } from '@playwright/test';

test("Child Window @CHILD", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page.getByRole("link", { name: /free access/i })).toBeVisible();

    const [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole("link", { name: /free\s+access/i }).click()
    ]);

    test.step("child tab", async () => {
        await newtab.waitForLoadState('domcontentloaded');
        await expect(newtab.locator('.preloader')).toBeVisible();
        await newtab.locator('.preloader').waitFor({state:'hidden'});
        await expect(newtab.getByRole("navigation")).toBeVisible();
        await expect(newtab.getByText(/.*please email us.*/i)).toBeVisible();
    });


});