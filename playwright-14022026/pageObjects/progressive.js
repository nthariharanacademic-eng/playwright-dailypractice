const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');

class progressive {


    /**@param {import('@playwright/test').Page} page  */
    constructor(page) {

        
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.landingForm1 = this.progressivePage.locator('#QuoteStartForm');
        this.zip = this.progressivePage.getByRole('textbox', { name: /Zip Code/i });
        this.prdt = this.progressivePage.locator('[href*="#productmodal"]');
        this.btnGetQuote = this.progressivePage.getByRole('button', { name: /Get a quote/i });
        this.btnContinue = this.progressivePage.getByRole('button', { name: /continue/i });
        this.prdt2 = this.progressivePage.locator('#AU');

        /**Name Edit Page locators */
        this.nameEditForm = this.progressivePage.locator(".main-content")
        this.fname = this.progressivePage.getByLabel('First Name');
        this.lname = this.progressivePage.getByLabel('Last Name');
        this.dob = this.progressivePage.locator('input[id*="DateOfBirth"]');
        this.primaryEmail = this.progressivePage.locator('input[id*="PrimaryEmailAddress"]');
        this.btnContinue = this.progressivePage.getByRole('button', { name: /continue/i });
        
    }

    async checkForLayout() {


        if (await this.progressivePage.getByRole('button', { name: /get a quote/i }).isVisible()) {
            await this.landingPage1();
        }
        else if (await this.progressivePage.getByRole('button', { name: /continue/i }).isVisible()) {
            await this.landingPage2();
        } else {
            console.log('####### Error none of the layouts match');
        }

    }

    /** Handles Landing Page 1 layout */
    async landingPage1() {
        await expect(this.landingForm1).toBeVisible();
        await expect(this.zip).toHaveValue(userdata.zip);
        await expect(this.prdt).toHaveText(/auto/i);
        await expect(this.btnGetQuote).toBeEnabled();
        await this.btnGetQuote.click();
        await this.progressivePage.waitForURL(/.*NameEdit.*/);
    }


    /** Handles Landing Page 2 layout */
    async landingPage2() {
        expect(await this.prdt2.isChecked()).toBeTruthy();
        await this.btnContinue.click();
        await this.zip.waitFor();
        await expect(this.zip).toHaveValue('76205');
        await this.btnGetQuote.click();
        await this.progressivePage.waitForURL(/.*NameEdit.*/);
    }

    async NameEdit() {
        await expect(this.nameEditForm).toBeVisible();
        await this.Wrapper.unblockWrapper(this.fname, () => this.fname.fill(userdata.fname),true);
        await this.Wrapper.unblockWrapper(this.lname, () => this.lname.fill(userdata.lname),true);
        await this.Wrapper.unblockWrapper(this.dob, () => this.dob.fill(userdata.dob),true);
        await this.Wrapper.unblockWrapper(this.primaryEmail,() =>  this.primaryEmail.fill(userdata.mailid),true);
        await this.Wrapper.unblockWrapper(this.btnContinue,() =>  this.btnContinue.click(),true);
        await expect(this.progressivePage).toHaveURL(/.*AddressEdit/);
    }

}

module.exports = progressive;