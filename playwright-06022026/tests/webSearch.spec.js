import {test,expect} from '@playwright/test';

test("DuckDuckGo Search @SEARCH", async({page})=>{
    const searchResult = page.locator(".react-results--main");
    await page.goto("https://duckduckgo.com/");
    await expect(page.getByRole("textbox")).toBeVisible();
    await page.getByRole("textbox").fill("playwright testing");
    await page.getByRole("textbox").press('Enter');
    await expect(searchResult).toBeVisible();
    await expect(page).toHaveTitle(/playwright\s+testing/i);
    await expect(page).toHaveURL(/[?&\\]q=playwright\+testing/i);

    /** check only occurence of the URL */

    await page.locator('.react-results--main').locator('')

    // await expect(page.getByTestId('result-extras-url-link').filter({hasText:/playwright.dev/i})).toBeVisible();

    /** Optional code to get the list of results and get the index */
    let tempresult = await page.getByTestId('result-extras-url-link').allTextContents();
    let index;
    for(let i =0; i<tempresult.length;i++){
        if(tempresult.includes("https://playwright.dev")){
            index=i;
            console.log("URL present in search Result => ",index, tempresult[index]);
            break;
        }
    }

});