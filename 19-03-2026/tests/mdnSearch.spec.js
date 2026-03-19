const {test, expect} = require('@playwright/test');

test("MDN Search @MDN", async({page})=>{
    await page.goto("https://developer.mozilla.org");

    const searchBtn = page.getByRole('button',{name:/search/i});
    const searchBox = page.getByRole('searchbox');
    const searchdialog = page.getByRole('dialog');
    const searchResult = searchdialog.getByRole('link');

    await searchBtn.first().click();
    await searchBox.fill('Promise.all');

    const searchCount =  await searchResult.count();
    expect(searchCount).toBeGreaterThan(2);
    await searchResult.first().click();
    await expect(page).toHaveURL(/promise/i);
   
    
})