const { expect } = require('@playwright/test');

class wrapper{

    /**@param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
    }

    /** @param {import('@playwright/test').Locator} field
     *  @param {boolean} skipfocus
     */
    
    
    async unblockWrapper(field, action, skipfocus) {

        //Locator for ovrelay that intercepts clicks
        const blocker1 = this.page.locator('#FaderBanner');
        const blocker2 = this.page.locator('.ui-blocker-wrapper');

        //wait until overlay is gone
        await expect(blocker1).toBeHidden();
        await expect(blocker2).toBeHidden();

        if (skipfocus == true) {
            await field.focus();
        }
        
        await action();

        await expect(blocker1).toBeHidden();
        await expect(blocker2).toBeHidden();

    }
}

module.exports = wrapper;