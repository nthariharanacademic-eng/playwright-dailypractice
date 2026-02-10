const {test,expect} = require('@playwright/test');


test("Special Locators @LOC", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator("form-comp .container form").waitFor();
    await page.getByPlaceholder("Password").fill("test");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").click();
    await page.getByRole("button",{name:"Submit"}).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByLabel("close").click();


});