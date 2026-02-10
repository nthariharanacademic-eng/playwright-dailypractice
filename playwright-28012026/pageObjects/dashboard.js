class dashboard{

    /**@param {import("@playwright/test").Page} page  */
    constructor(page){
        this.page = page;
        this.dashboard_page = page.locator(".card-body b").last();
        this.prdt_finder=  page.locator(".card").filter({hasText:process.env.PRDT});
        this.addToCart = this.prdt_finder.getByRole("button",{name:/Add To Cart/});
       this.myCart= page.locator('[routerlink*="cart"]');
    }

}

module.exports = {dashboard};