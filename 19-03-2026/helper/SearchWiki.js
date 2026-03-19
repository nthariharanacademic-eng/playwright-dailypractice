const {expect} = require('@playwright/test');

class SearchWiki {

    /*** @param {import("@playwright/test").Page} page */
    constructor(page) {
        this.page = page;
        this.endPoint = "https://www.wikipedia.org/";
    }

    async searchWikipedia(searchTerm) {
        await this.page.goto(this.endPoint);
        const searchBox = this.page.getByRole('searchbox');
        const btnSearch = this.page.getByRole('button', { name: /search/i });
        await expect(searchBox).toBeVisible();
        await searchBox.fill(searchTerm);
        await btnSearch.click();
        
    }
}

module.exports = { SearchWiki };