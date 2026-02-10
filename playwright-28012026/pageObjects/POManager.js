const { loginPage } = require('./loginPage');
const { dashboard } = require('./dashboard');
const { myCart } = require('./myCart');
const { paymentMethod } = require('./paymentMethod');
const { orderPlaced } = require('./orderPlaced');
const { myOrders } = require('./myOrders');


class POManager {

    /**@param {import('@playwright/test').Page} page  */

    constructor(page) {
                
        this.loginPage = new loginPage(page);
        this.dashboard = new dashboard(page);
        this.myCart = new myCart(page);
        this.paymentMethod = new paymentMethod(page);
        this.orderPlaced = new orderPlaced(page);
        this.myOrders = new myOrders(page);
    }


}


module.exports = { POManager };


