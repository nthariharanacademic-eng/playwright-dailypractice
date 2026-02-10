class myCart{

    /**@param {import("@playwright/test").Page} page  */

   constructor(page) {
    this.page = page;
   this.cart =  page.locator(".cartSection").last();
   this.btn_checkout = page.getByRole("button",{name:"Checkout"});
   }
   
    

}
module.exports = {myCart};