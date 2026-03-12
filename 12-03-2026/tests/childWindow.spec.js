const {test,expect} = require('@playwright/test');


test("Child Window @CHILD", async({page})=>{
    const endPoint = "https://rahulshettyacademy.com/loginpagePractise/";
    await page.goto(endPoint);

    
    const link_smartHire = page.getByRole('link',{name:'ResumeAssistance'});

   
    await expect(link_smartHire).toBeVisible();
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        link_smartHire.click()
    ]);

    await expect(newTab).toHaveURL(/.*\/documents-request/);
    const newText = newTab.getByText('email us');
    await expect(newText).toBeVisible();
    console.log(await newText.textContent());   

});