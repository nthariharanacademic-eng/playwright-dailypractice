const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');

class policyGenius {

    /**@param {import('@playwright/test').Page} page  */

    constructor(page) {
        this.page = page;
        this.Wrapper = new wrapper(page);

        this.cookieDialog = this.page.getByRole('dialog');
        this.cookieReject = this.cookieDialog.getByRole("button", { name: /Reject all but necessary/i });
        this.navbar = this.page.locator('[class*="top-navigation"]');
        this.btnGetStarted = this.navbar.getByRole('button', { name: /get started/i });
        this.popupPromise = this.page.waitForEvent('popup');
        this.currentlyInsured = this.page.locator('fieldset').nth(0);
        this.multiVehicle = this.page.locator('fieldset').nth(1);
        this.homeOwner = this.page.locator('fieldset').nth(2);
        this.enterAge = this.page.getByPlaceholder('Enter your age');
        this.enterZip = this.page.getByPlaceholder('Enter your ZIP code');
        this.btnViewOptions = this.page.getByRole('button',{name:/view options/i});
        this.providerOptions = this.page.locator('[class*="listingBox"]');
        this.selectProgressive = this.providerOptions.filter({hasText:'Progressive'}).getByRole('link',{name:"Get a quote"});
    }

    /***@param {string} url  */
    async navigateToPolicyGenius(url) {
        await this.page.goto(url);
        await expect(this.cookieDialog.getByText(/Accept All Cookies/i)).toBeVisible();
        await this.cookieReject.click();
        await expect(this.navbar).toBeVisible();
        await this.btnGetStarted.click();
        await expect(this.page).toHaveURL(/.*auto-insurance\/partner-offers\//);
        await expect(this.page.locator('fieldset').last()).toBeVisible();
    }

    async partnerOffers() {   
        await this.Wrapper.unblockWrapper(this.currentlyInsured, () => this.currentlyInsured.getByText('Yes').click());
        await this.Wrapper.unblockWrapper(this.multiVehicle,() => this.multiVehicle.getByText('Yes').click());
        await this.Wrapper.unblockWrapper(this.homeOwner,() => this.homeOwner.getByText('Yes').click());
        await this.Wrapper.unblockWrapper(this.homeOwner,() => this.homeOwner.getByText('Yes').click());
        await this.Wrapper.unblockWrapper(this.enterAge,() => this.enterAge.fill(userdata.age));
        await this.Wrapper.unblockWrapper(this.enterZip,() => this.enterZip.fill(userdata.zip));
        await this.Wrapper.unblockWrapper(this.btnViewOptions,() => this.btnViewOptions.click());
        await expect(this.providerOptions.last()).toBeVisible();
        await this.Wrapper.unblockWrapper(this.selectProgressive,() => this.selectProgressive.click());

        this.progressivePage = await this.popupPromise;

        await expect(this.progressivePage).toHaveURL(/.*lp\/auto-compare\/.*/);
        await this.progressivePage.waitForLoadState('domcontentloaded');
       
    }

    async getProgressivePage(){
        return this.progressivePage;
    }

}

module.exports = policyGenius;