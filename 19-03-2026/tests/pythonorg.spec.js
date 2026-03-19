const {test,expect} = require('@playwright/test');

test("Check Python Site @PYTHON" , async({page})=>{
    await page.goto("https://python.org");
    const downloadsLink =  page.getByRole('navigation').getByRole('link',{name: /downloads/i});
    await expect(downloadsLink).toBeVisible();
    await downloadsLink.click();
    await expect(page).toHaveURL(/\/downloads\/$/);
    await expect(page.getByText('Download the latest version for Windows')).toBeVisible();
})