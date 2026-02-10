class myOrders {

        /**@param {import("@playwright/test").Page} page  */
        constructor(page){
            this.page=page;
            this.myorder_content =page.getByRole("row").last();
            this.order_table = page.locator("tr");
            this.order_details = page.locator(".row").last();
            this.order_details_orderId = page.locator(".-main").innerText();
            this.order_details_prdtName = page.locator(".title");
        }

}

module.exports = {myOrders};