const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');


class addressEdit{

    /**  @param {import('@playwright/test').Page} page */

    constructor(page) {        
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.pageContent = this.progressivePage.locator('.main-content'); 
        this.street = this.progressivePage.getByLabel('Street number and name');
        //this.streetOptions = this.progressivePage.getByRole('listbox');
        //getByRole('option', { name: 'Baldwin St Denton, TX 76205' })
        this.streetOptions = this.progressivePage.getByRole('option', { name: userdata.street }); 
        this.city = this.progressivePage.getByLabel('City');
        this.state = this.progressivePage.getByLabel('State');
        this.zip = this.progressivePage.getByLabel('ZIP Code');
        this.zipType = this.progressivePage.locator('[name*="MailingZipType"]');
        this.startQuote = this.progressivePage.getByRole('button',{name:'Ok, start my quote'});
    }

    async addressEdit() {
        await expect(this.pageContent).toBeVisible();
        await this.Wrapper.unblockWrapper(this.street,()=>this.street.pressSequentially(userdata.street));
        await expect(this.streetOptions).toBeVisible();
        await this.Wrapper.unblockWrapper(this.streetOptions,() => this.streetOptions.click());
        await expect(this.city).toHaveValue(userdata.city);
        await expect(this.state).toHaveValue(userdata.state);
        await expect(this.zip).toHaveValue(userdata.zip);
        await this.Wrapper.unblockWrapper(this.zipType,()=>this.zipType.check());
        await this.Wrapper.unblockWrapper(this.startQuote,()=>this.startQuote.click()); 
        await expect(this.progressivePage).toHaveURL(/.*VehiclesAllEdit/);
        await this.progressivePage.waitForLoadState('domcontentloaded') ;
    }

}

module.exports = addressEdit;