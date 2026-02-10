import { test, request } from '@playwright/test';

const login_payload = { userEmail: "newtest123@test.com", userPassword: "Testid@123$" };
const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

let token, orderId;

test.beforeAll("Login via API", async () => {
    const api = await request.newContext();
    const apiResponse = await api.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: login_payload
    });
    const json_apiResponse = await apiResponse.json();
    token = json_apiResponse.token;
    console.log("Token ==> ", token);
});


test("Create Order using API @ORDER", async () => {
    const api = await request.newContext();
    const apiResponse = await api.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            Authorization: token
        }
    });

    const json_apiResponse = await apiResponse.json();
    orderId = json_apiResponse.orders[0];
    console.log("ORderId ==>", orderId);
});