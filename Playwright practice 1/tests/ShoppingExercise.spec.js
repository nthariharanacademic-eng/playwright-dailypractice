const { test } = require('@playwright/test');


test("Shopping Exercise 1 @SHOP", async ({page}) => {

    const mail_id = "newtest123@test.com";
    const pwd = "Testid@123$";
    const login_section= page.locator(".login-section-wrapper");
    const txt_mailid = page.getByPlaceholder("email@example.com");
    const txt_pwd = page.getByPlaceholder("enter your passsword");
    const btn_login = page.getByRole("button",{name : "login"});
    const prod_list = page.locator(".row .card");

    await page.goto("https://rahulshettyacademy.com/client/");
    await login_section.waitFor();
    await txt_mailid.fill(mail_id);
    await txt_pwd.fill(pwd);
    await btn_login.click();
    await prod_list.last().waitFor(); //wait for products to load
    console.log(await prod_list.nth(1).locator("h5 b").textContent());
    console.log("*****");
    console.log(await prod_list.locator("h5 b").allTextContents());
    //prod_list.first().)
    
});