import {test,expect,request} from "@playwright/test";

const login_payload ={userEmail:"newtest123@test.com",userPassword:"Testid@123$"};
const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
let token,orderId;


test("API Post @POST", async({page})=>{

    const api = await request.newContext({ignoreHTTPSErrors:true});
    let apiResponse = await api.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data: login_payload
    });
    expect(apiResponse.ok());
    let json_apiResponse= await apiResponse.json();
    token = json_apiResponse.token;
    console.log("Token => ",token);

    apiResponse = await api.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload,
        headers:{
            Authorization : token
        }
    });

    expect(apiResponse.ok());
    json_apiResponse = await apiResponse.json();
    orderId = json_apiResponse.orders[0];
    console.log("orderId =>",orderId);  
    
    await tryLogin(page);
});


/**@param {import("@playwright/test").Page} page  */

async function tryLogin(page){

    await page.addInitScript(param_token=>{
        window.localStorage.setItem("token",param_token)},
        token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card").last().waitFor();
    await invalidAccess(page);
}

/**@param {import("@playwright/test").Page} page  */

async function invalidAccess(page){

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",async (route,request) =>{
        let origUrl = request.url();
        let mockUrl = origUrl.replace(/.{3}$/,"123");
        await route.continue({url:mockUrl});
    });

    await page.getByRole("listitem").getByRole("button",{name: "  ORDERS"}).click();
    await page.getByRole("row").last().waitFor();
    await page.getByRole("row").getByRole("button",{name:"View"}).last().click();
    await page.locator(".blink_me").waitFor();
    expect(page.getByText("You are not authorize to view this order")).toBeVisible();
    await mockAPIResponse(page);
}


/**@param {import("@playwright/test").Page} page  */

async function mockAPIResponse(page){
    const mockViewResp ={data:[],message:"No Orders"};

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", (route) => 
            route.fulfill({
                body: JSON.stringify(mockViewResp),
                status: 200,
                contentType: 'application/json'
            })
    );


    await page.getByRole("listitem").getByRole("button",{name:" HOME "}).click();
    await page.getByRole("listitem").getByRole("button",{name: "  ORDERS"}).click();
    await page.locator(".container").last().waitFor();
    await expect(page.getByText(" You have No Orders to show at this time. Please Visit Back Us ")).toBeVisible();
    
}
