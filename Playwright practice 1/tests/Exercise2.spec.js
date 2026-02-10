const { test, expect } = require('@playwright/test');

/****
 * 
 * 1. Login to client url - DONE
 * 2. add product to cart. - DONE
 * 3.goto cart and verify that correct product is added - DONE
 * 4. Checkout and verify same product and QTy. - DONE
 * 5. add cc details  - DONE
 * 6. verify the same mail id is showed in shipping - DONE
 * 7. Place order. - DONE
 * 8. verify the thank you text and capture the order ID.- DONE
 * 9. go to orders page and verify that the order is available.- DONE
 * 10. go to particular order and verify the details are correct.
 *  
 */


test("@EXE2 Exercise 2 - shopping checkout product", async ({ page }) => {


    //*****Input Data & Locators***//
    const mail_id = "newtest123@test.com";
    const pwd = "Testid@123$";
    const tgt_product = "iphone 13 pro";
    const login_section = page.locator(".login-section-wrapper");
    const txt_mailid = page.getByPlaceholder("email@example.com");
    const txt_pwd = page.getByPlaceholder("enter your passsword");
    const btn_login = page.getByRole("button", { name: "login" });
    const prod_list = page.locator(".row .card-body");
    const all_prods = await page.locator(".card-body");
    //const btn_addToCart = page.locator(".card-body button .fa-shopping-cart");
    const btn_Checkout = page.getByRole("button", { name: "Checkout" });
    const added_Product = page.locator(".cartSection h3");
    const popup_Toast = page.locator(".toast-message");
    const btn_MyCart = page.locator("button[routerlink*= cart]"); //this can be rewritten using getByRole('listitembutton')
    const form_cc= page.locator(".form__cc input");
    const confirm_mail = page.locator(".user__name [type='text']");
    const select_country = page.getByPlaceholder("Select Country");
    const select_india = page.getByRole("button", { name: "India" });
    const btn_placeOrder= page.getByText('Place Order');
    const fetch_OrderId= page.locator("label.ng-star-inserted");
    const btn_MyOrders = page.locator('ul li [routerlink="/dashboard/myorders"]');
    const table_OrderId = page.locator("tr th[scope=row]");
    const table_OrderRow = page.locator("tbody tr");

    await page.goto("https://rahulshettyacademy.com/client/");
    await login_section.waitFor();
    await txt_mailid.fill(mail_id);
    await txt_pwd.fill(pwd);
    await btn_login.click();
    await prod_list.last().waitFor();

    //below line replaces the forloop 
    await all_prods.filter({hasText:`${tgt_product}`}).getByRole('button',{name: " Add To Cart"}).click();

    // const prod_names = await all_prods.allTextContents();
    
    // //This for loop has to be written with just chaining.

    // for (let i=0; i < prod_names.length; i++) {
    //     if (prod_names[i] == tgt_product) {
    //         await btn_addToCart.nth(i).click();
    //         break;
    //     }
    // }
    
    await popup_Toast.isVisible();
    expect(await popup_Toast).toHaveText(" Product Added To Cart ");
    await btn_MyCart.click();
    await page.locator("li.items").last().waitFor();
    expect(await added_Product).toHaveText(tgt_product);
    await btn_Checkout.click();
    await page.locator(".form__cc").waitFor();
    await form_cc.nth(1).fill("456");
    await form_cc.nth(2).fill("Test name");
    expect(await confirm_mail.nth(0)).toHaveText(mail_id);
    await select_country.pressSequentially("India");
    await select_india.nth(1).click();//try to get the text and then click. use loop to iterate
    await btn_placeOrder.click();
    expect(await page.locator("tr h1")).toHaveText(" Thankyou for the order. ");
    const temp_order_id = await fetch_OrderId.textContent();
    const temp_str = temp_order_id.split('|');
    const order_id = temp_str[1].trim("");
    await btn_MyOrders.click();
    await table_OrderRow.last().waitFor();

    await table_OrderRow.filter({hasText:`${order_id}`}).getByRole('button',{name:"View"}).click();


    /*
    const order_list = await table_OrderId.allTextContents();
    let index_order=-1;
    for(let j=0;j<order_list.length;j++){
        if(order_list[j]==order_id){
            index_order=j;
            break;
        }
    }
   
    await table_OrderRow.nth(index_order).getByRole('button',{name:"View"}).click();
     */
    expect(await page.locator(".row .-main")).toHaveText(order_id);
    expect(await page.locator(".title")).toHaveText(tgt_product);
});