const {test,expect } = require('@playwright/test');

test("Child Window @CHILD",async({page})=>{
    
    const link = page.getByRole('link',{name:/free access/i});   
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/",{waitUntil:'domcontentloaded'});

    await expect(link).toBeVisible();

    /*** Listener for the newtab */  
    const [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        link.click()
    ]);
   
    await newtab.waitForLoadState('domcontentloaded');
    await expect(newtab).toHaveURL(/.*documents-request/);
    const mailsection = newtab.getByRole('paragraph');
    const mailtxt = mailsection.getByText(/mail us/i);
    await expect(mailtxt).toBeVisible();
    console.log(await mailtxt.textContent());

});

/****
 * page.getbyrole(paragraph) can be used as per the ARIA role. but since most of the <p> tags ,
 * dont have accessible names its recommended to use getbytext()
 * 
 * When using getbyrole(para) it does work. for stability used getbytext();
 * 
 * Also without promise can also be done.
 * 
 */