import { test, expect } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
import userData from '../testdata/userData.json' with {type: 'json'};


test("Interpret API Request @APIINT", async ({ browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const apiutil = await apiUtils.init();
    const token = await apiutil.getToken(userData);

    await context.addInitScript(val => {
        window.localStorage.setItem("token", val);
    }, token);

    const page = await context.newPage();

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async (route, request) => {
            let origURL = request.url();
            let mockURL = origURL.replace(/.{3}$/, "333");
            await route.continue({ url: mockURL });
        }
    );

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card").last().waitFor();
    await expect(page.getByRole("button", { name: /orders/i })).toBeVisible();
    await page.getByRole("button", { name: /orders/i }).click();
    await page.getByRole("button", { name: /view/i }).first().click();
    await expect(page.getByText(/you are not authorize to view this order/i)).toBeVisible();

});


// https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=**


