class orderPlaced{

        constructor(page){
            this.page=page;
            this.page_content= page.locator("td.box").last();
            this.thankyou = page.getByText(/Thankyou for the order./);
            this.orderText = page.locator("label.ng-star-inserted").innerText();
            this.btn_myorders = page.locator('li [routerlink*="myorders"]');
        }
}

module.exports={orderPlaced};