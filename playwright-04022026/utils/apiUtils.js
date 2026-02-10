import { request } from '@playwright/test'
export class apiUtils {
   
    
    /** Factory initializer */
    static async init() {
        const instance = new apiUtils();
        instance.api = await request.newContext({ ignoreHTTPSErrors: true });
        return instance;
    }

   
    // constructor(){
    //     /**@type {import('@playwright/test').APIRequestContext} api*/
    //     this.createAPIContext();
        
    // }

    // async createAPIContext(){
    //     this.api = await request.newContext({ignoreHTTPSErrors: true});
        
    // }

    async getToken(login_payload) {
        const apiResponse = await this.api.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: login_payload
        });
        
        const json_apiResponse = await apiResponse.json();
        return (json_apiResponse.token);

    }

    
    async createOrder(token, orderPayload){
        const apiResponse = await this.api.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data : orderPayload,
            headers:{
                Authorization : token
            }
        });
        const json_apiResponse = await apiResponse.json();
        return (json_apiResponse.orders[0]);
    }

}
