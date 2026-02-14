const { expect } = require('@playwright/test');

class wrapper{

    /**@param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
    }

    /** @param {import('@playwright/test').Locator} field */
    
    async unblockWrapper(field, action) {

        //Locator for ovrelay that intercepts clicks
        const blocker1 = this.page.locator('#FaderBanner');
        const blocker2 = this.page.locator('.ui-blocker-wrapper');

        //wait until overlay is gone
        await expect(blocker1).toBeHidden();
        await expect(blocker2).toBeHidden();

        await field.focus();
        await action();

        await expect(blocker1).toBeHidden();
        await expect(blocker2).toBeHidden();

    }
}

module.exports = wrapper;