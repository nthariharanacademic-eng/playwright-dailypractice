import { test, expect } from '@playwright/test';
import { POManager } from '..//pageObjects//POManager';

// import { loginPage } from '../pageObjects/loginPage';
// import { dashboard } from '../pageObjects/dashboard';
// import { myCart } from '../pageObjects/myCart';
// import { paymentMethod } from '../pageObjects/paymentMethod';
// import { orderPlaced } from '../pageObjects/orderPlaced';
// import { myOrders } from '../pageObjects/myOrders';

test("Page Object Test @POM", async ({ page }) => {

    const obj_POManager = new POManager(page);
    // const obj_loginPage = new loginPage(page);
    // const obj_dashboard = new dashboard(page);
    // const obj_myCart = new myCart(page);
    // const obj_paymentMethod = new paymentMethod(page);
    // const obj_orderPlaced = new orderPlaced(page);
    // const obj_myOrders = new myOrders(page);
    
   

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await obj_POManager.loginPage.section_login.waitFor();
    await obj_POManager.loginPage.mailID.fill(process.env.USER_MAIL);
    await obj_POManager.loginPage.pwd.fill(process.env.USER_PWD);
    await obj_POManager.loginPage.btn_login.click();

    await obj_POManager.dashboard.dashboard_page.waitFor();
    await obj_POManager.dashboard.prdt_finder;
    await obj_POManager.dashboard.addToCart.click();
    await obj_POManager.dashboard.myCart.click();

    await obj_POManager.myCart.cart.waitFor();
    await obj_POManager.myCart.btn_checkout.click();

    await obj_POManager.paymentMethod.section_container.waitFor();
    await obj_POManager.paymentMethod.cc_cvv.fill("333");
    await obj_POManager.paymentMethod.cc_name.fill("Test");

    expect(await obj_POManager.paymentMethod.shipping_name).toMatch(process.env.USER_MAIL);
    expect(await obj_POManager.paymentMethod.shipping_mail).toMatch(process.env.USER_MAIL);
    await obj_POManager.paymentMethod.shipping_country.pressSequentially("India");

    await expect(obj_POManager.paymentMethod.country_results).toBeVisible();
    await obj_POManager.paymentMethod.select_country.click();
    await obj_POManager.paymentMethod.placeOrder.click();

    await obj_POManager.orderPlaced.page_content.waitFor();
    await expect(obj_POManager.orderPlaced.thankyou).toBeVisible();

    const temp_order = await obj_POManager.orderPlaced.orderText;
    const orderId = await temp_order.split('|').at(1).trim();
    console.log("Order Id=>", orderId);
    await obj_POManager.orderPlaced.btn_myorders.click();

    await obj_POManager.myOrders.myorder_content.waitFor();
    const find_order = obj_POManager.myOrders.order_table.filter({ hasText: orderId });
    await find_order.getByRole("button", { name: "View" }).click();

    await obj_POManager.myOrders.order_details.waitFor();
    expect(await obj_POManager.myOrders.order_details_orderId).toMatch(orderId);
    await expect(obj_POManager.myOrders.order_details_prdtName).toHaveText(process.env.PRDT);
});