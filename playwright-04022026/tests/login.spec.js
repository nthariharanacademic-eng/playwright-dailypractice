import {test, request} from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
let token,orderId;
const login_payload ={userEmail:"newtest123@test.com",userPassword:"Testid@123$"};
const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

test ("API login @API", async()=>{
    //const api = await request.newContext({ignoreHTTPSErrors: true});
    //const APIUtils = new apiUtils();
    const APIUtils = await apiUtils.init();
    token =  await APIUtils.getToken(login_payload );
    orderId = await APIUtils.createOrder(token ,orderPayload);
    console.log("Order ID =>", orderId); 
});



