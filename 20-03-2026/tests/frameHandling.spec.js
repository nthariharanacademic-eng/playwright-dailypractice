const { test, expect } = require('@playwright/test');

test.describe("Frame handling via Framelocator", async () => {
    test('Handling Frames @FRAME', async ({ page }) => {
        const BASEURL = 'https://rahulshettyacademy.com/AutomationPractice/';
        await page.goto(BASEURL);

        const frameSection = page.getByRole('group', { name: 'iFrame Example' });

        await test.step("Check Frame visibility", async () => {
            await expect(frameSection).toBeVisible();
        });

        const frame1 = page.frameLocator('#courses-iframe');
        const navbar = frame1.getByRole('navigation');
        const navbar_plan = navbar.getByRole('link', { name: 'All Access plan' });
        const sampleText = frame1.getByText('happy subscibers');

        await test.step("Assert navbar is visible inside the frame", async () => {
            await expect(navbar).toBeVisible();
        });

        await test.step("Navigate to all access plan in the Navbar & Verify the text content", async () => {
            await navbar_plan.click();
            await expect(sampleText).toBeVisible();
        });

    });

});
