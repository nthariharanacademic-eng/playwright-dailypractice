const {test,expect} = require('../fixtures/authentication');


test("Authentication via Fixtures @AUTH", async({token,orderId})=>{
    console.log("Token =>", token);
    console.log("Order Id =>",orderId);
});