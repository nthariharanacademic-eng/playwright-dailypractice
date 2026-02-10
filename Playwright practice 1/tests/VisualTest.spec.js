const {test,expect} = require('@playwright/test');

test("Visual Test @VIS", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("div").last().waitFor();
    expect(await page.screenshot()).toMatchSnapshot('page-screenshot.png');
    await page.getByPlaceholder("Hide/Show Example").screenshot({path:'field_snapshot.jpeg'});



});