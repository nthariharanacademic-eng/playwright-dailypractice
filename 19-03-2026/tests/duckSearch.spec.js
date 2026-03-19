const {test, expect} = require('@playwright/test');

test("Duck Duck Go Search @DUCK" , async({page})=>{

    await page.goto("https://duckduckgo.com/");

    const searchBox = page.getByRole('combobox', { name: /Search/i });
    const searchTerm = "Playwright locator strict mode";
    const searchResultContainer = page.locator('.react-results--main');
    const searchResultLinks = searchResultContainer.getByRole('listitem').getByRole('link');
    const targetLink = 'playwright.dev';

    await searchBox.fill(searchTerm);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/=search$/);
    await expect(searchResultContainer).toBeVisible();
    await expect(searchResultLinks.getByText(targetLink)).toBeVisible();
    
});