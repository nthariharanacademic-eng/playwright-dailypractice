const { test, expect } = require('@playwright/test');

test("Login Page with context @UI", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userid = page.locator("#username");
    const pwd = page.locator("#password");
    const signIn = page.getByRole("button", { name: "Sign In" });
    const error_msg = page.locator("[style*=block]");
    const link_blinker = page.locator("a[href*=request]");
    //After login
    const products = page.locator(".row .card");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userid.fill("rahulshettyacademy");
    await pwd.fill("learning1");
    await signIn.click();
    await error_msg.isVisible();
    console.log(await error_msg.textContent());
    expect(await error_msg.textContent()).toEqual("Incorrect username/password.");

    await userid.fill("");
    await pwd.fill("");
    await userid.fill("rahulshettyacademy");
    await pwd.fill("learning");
    //select dropdowns
    await page.locator("select").selectOption("Consultant");
    await page.locator(".customradio [value='user']").click();
    await page.locator("[style*=block]").waitFor();
    await page.getByRole("button", { name: "Okay" }).click();
    // await page.locator("#okayBtn").click();
    //await signIn.click();

    await expect(link_blinker).toHaveAttribute('class', 'blinkingText');

    /****
     * 
     * login section
     * 
     */
    /*
    await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop");
    await page.locator(".row .card").last().waitFor();
    //console.log(await products.first().locator(".card-title").textContent()); 
    let  prod_name = await products.first().locator(".card-title a").textContent();
    // prod_name= prod_name.trim();
    // console.log("****");
    console.log(prod_name);
    console.log("****");
    console.log(await products.locator(".card-title a").allTextContents());
    */
});


test("google page", async ({ page }) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});


test("New TAB @TAB", async ({ page, context }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //await console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const link_blinker = page.locator("a[href*=request]");

    //listener

    const [page2] = await Promise.all([
        context.waitForEvent("page"),
        await link_blinker.click()
    ]);


    //context.waitForEvent('page');


    console.log(await page2.title())
    console.log(await page2.locator("p.red").textContent() );
    let txt_red = await page2.locator("p.red").textContent();
   console.log(txt_red.split('@'));

});





