const {test,expect} = require('@playwright/test');


test ("Child Window @CHILD", async({page})=>{

    const endPoint = "https://rahulshettyacademy.com/loginpagePractise/";
    const newLink = page.getByRole('link',{name:/.*TechSmartHire/});
    
    await page.goto(endPoint);
    
    await expect(newLink).toBeVisible();
    const [newTab]= await Promise.all([
        page.waitForEvent('popup'),
        newLink.click()
    ]);

    await expect(newTab).toHaveURL("https://techsmarthire.com/");
    await expect(newTab.getByRole('button',{name : 'Browse Open Jobs'})).toBeVisible();
   
});