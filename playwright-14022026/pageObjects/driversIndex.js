const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');

class driversIndex{

    /*** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.page_content = this.progressivePage.locator('driver');
        this.driverName = this.progressivePage.locator('h2 > .truncate-name');
        this.btnContinue = this.progressivePage.getByRole('button', {name:/continue/i});
    }

    async driversIndex(){
        await expect(this.page_content).toBeVisible();
        await expect(this.driverName).toHaveText(userdata.fname+" "+userdata.lname);
        await this.Wrapper.unblockWrapper(this.btnContinue, () => this.btnContinue.click());
        await expect(this.progressivePage).toHaveURL(/.*DriversEditNoCreditHitPniDetails/);
        await this.progressivePage.waitForLoadState('domcontentloaded');
    }

}

module.exports = driversIndex;