const {test,expect} = require('../fixtures/getToken');


test("Create Order Using API @ORDER", async({request,token})=>{
    
    const ORDERURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
    const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

    const apiResp = await request.post(ORDERURL,{
        data : orderPayload,
        
        headers:{
            Authorization : token
        }
    });

    expect(apiResp.ok()).toBeTruthy();
    const json_apiResp = await apiResp.json();
    expect(json_apiResp.message).toMatch('Order Placed Successfully');
    const orderId = json_apiResp.orders[0];
    console.log("Order Id =>", orderId);
});