const { test, expect } = require('@playwright/test');


test.describe("Child Window  Handling", async () => {
    test("Child Window Handling @CHILD", async ({ page }) => {

        const endPoint = "https://rahulshettyacademy.com/loginpagePractise/";

        test.step("Navigate to Site", async () => {
            await page.goto(endPoint);
        })

        const newTabLink = page.getByRole('link', { name: /\/ResumeAssistance\/Material$/ });


        test.step("Click the Link", async () => {
            await expect(newTabLink).toBeVisible();
        });


        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            newTabLink.click()
        ]);

        test.step("Verify URL of NewTab and fetch Text", async () => {
            await expect(newTab).toHaveURL(/documents-request$/);
            const mailtext = await newTab.getByText(/email us/).textContent();
            console.log(mailtext);
        });

    });
});
