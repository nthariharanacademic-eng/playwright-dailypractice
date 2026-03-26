const {test,expect}= require('../fixtures/authentication');

test("Get Token @AUTH", async({token, orderId})=>{
    console.log("Token ==> ", token);
    console.log("Order ID = >", orderId);
});