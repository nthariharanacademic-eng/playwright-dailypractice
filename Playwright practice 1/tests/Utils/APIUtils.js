const { expect} = require('@playwright/test');

class APIUtils {


    constructor(APIContext) {
        this.APIContext = APIContext;
    }


    async getToken(login_data) {

        const loginresponse = await this.APIContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login/",
            {
                data: login_data,
                ignoreHTTPSErrors: true
            });

        // await expect(loginresponse.ok()).toBeTruthy();
        const Jsonloginresponse = await loginresponse.json();
        this.token = Jsonloginresponse.token;
        return this.token;
    }


    /***
     * 
     * Order API 
     */

    async createOrder(order_data) {

        const createOrderResponse = await this.APIContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: order_data,
                headers:
                {
                    Authorization: this.token
                },
                ignoreHTTPSErrors: true
            });


        const json_orderResponse = await createOrderResponse.json();
        //console.log(json_orderResponse);
        await expect(createOrderResponse.status()).toBe(201);
        await expect(json_orderResponse.message).toEqual("Order Placed Successfully");
        this.order_id = json_orderResponse.orders[0];
        return this.order_id;

    }





}

module.exports={APIUtils}