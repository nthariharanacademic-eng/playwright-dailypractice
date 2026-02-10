import { test, expect } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
import noOrder from '../testdata/noOrders.json' with {type : 'json'};
import userData from '../testdata/userData.json' with {type : 'json'};

test("Interpret API Response @APIRSP", async ({ browser }) => {
    const context = await browser.newContext();
    const apiutil = await apiUtils.init();
    const token = await apiutil.getToken(userData);

    await context.addInitScript(val => {
        window.localStorage.setItem("token", val);
    }, token);

    const page = await context.newPage();
    /***Listener */
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async (route) => {
            let resp = await route.fetch();
            await route.fulfill({
                status : 200,
                headers: resp.headers(),
                body: JSON.stringify(noOrder)
                
            });
        }
    );

    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page.getByRole("button", { name: /orders/i })).toBeVisible();
    await page.getByRole("button", { name: /orders/i }).click();
    await expect(page.getByText(/You have no orders/i)).toBeVisible();
    await context.close();
});