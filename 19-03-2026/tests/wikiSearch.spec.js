const {test,expect} = require('@playwright/test');
const {SearchWiki} = require('../helper/SearchWiki');

test("Wiki Search @WIKI", async({page})=>{
    const wikisearch = new SearchWiki(page);
    const searchTerm = "playwright (software)"
    await wikisearch.searchWikipedia(searchTerm);
    await expect(page).toHaveURL(/playwright.*\(software\)/i);    
    const h1 = page.getByRole('heading',{level : 1});
    await expect(h1).toHaveText("Playwright (software)");

});