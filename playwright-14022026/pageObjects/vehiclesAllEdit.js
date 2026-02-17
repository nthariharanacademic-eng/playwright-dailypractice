const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');


class vehiclesAllEdit{

    /**  @param {import('@playwright/test').Page} page */

    constructor(page) {        
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.scroller = this.progressivePage.locator('.scroller');
        this.pageContent = this.progressivePage.locator('.vehicles-container');
        this.vehicleYear = this.progressivePage.locator('select[id*="list_Year"]');
        this.vehicleMake = this.progressivePage.locator('select[id*="list_Make"]');
        this.vehicleModel = this.progressivePage.locator('select[id*="list_Model"]');
        this.vehicleUse = this.progressivePage.locator('select[id*="list_VehicleUse"]');
        this.NetworkCompanyIndicator = this.progressivePage.locator('input[id*="NetworkCompanyIndicator"]');
        this.CommuteDaysPerWk = this.progressivePage.locator('select[id*="list_CommuteDaysPerWk"]');
        this.OneWayCommuteMiles = this.progressivePage.locator('input[id*="list_OneWayCommuteMiles"]');
        this.GaragingZip = this.progressivePage.locator('input[id*="list_GaragingZip"]');
        this.OwnOrLease = this.progressivePage.locator('select[id*="list_OwnOrLease"]');
        this.LengthOfOwnership = this.progressivePage.locator('select[id*="list_LengthOfOwnership"]');  
        this.AnnualMileageForRate = this.progressivePage.locator('select[id*="list_AnnualMileageForRate"]');
        this.saveVehicle = this.progressivePage.getByRole('button',{name:/save vehicle/i});
        this.savedVehicleSection = this.progressivePage.locator('#vehicle0');
        this.savedYear = this.progressivePage.locator('h2>span').nth(0);
        this.savedMake = this.progressivePage.locator('h2>span').nth(1);
        this.savedModel = this.progressivePage.locator('h2>span').nth(2);
        this.btnContinue = this.progressivePage.getByRole('button',{name:/continue/i});        
        
    }

    async vehiclesAllEdit() {

        if(await this.scroller.isVisible()){
            await this.scroller.getByRole('button',{name:"No, I'll add my own"}).click();
        }

        await expect(this.pageContent).toBeVisible();

        

        await this.Wrapper.unblockWrapper(this.vehicleYear,() => this.vehicleYear.selectOption(userdata.vehicleYear),true);
        await this.Wrapper.unblockWrapper(this.vehicleMake,() => this.vehicleMake.selectOption(userdata.vehicleMake),true);
        await this.Wrapper.unblockWrapper(this.vehicleModel,() => this.vehicleModel.selectOption(userdata.vehicleModel),true);
        await this.Wrapper.unblockWrapper(this.vehicleUse,() => this.vehicleUse.selectOption(userdata.vehicleUse),true);
        await this.Wrapper.unblockWrapper(this.NetworkCompanyIndicator,() => this.NetworkCompanyIndicator.check(),true);
        await this.Wrapper.unblockWrapper(this.CommuteDaysPerWk,() => this.CommuteDaysPerWk.selectOption(userdata.vechicleCommuteDays),true);
        await this.Wrapper.unblockWrapper(this.OneWayCommuteMiles ,() => this.OneWayCommuteMiles.fill(userdata.vechicleCommuteMiles),true);   
        await this.Wrapper.unblockWrapper(this.GaragingZip, () => expect(this.GaragingZip).toHaveValue(userdata.zip),true);
        await this.Wrapper.unblockWrapper(this.OwnOrLease ,() => this.OwnOrLease.selectOption(userdata.vehicleOwnLease),true);
        await this.Wrapper.unblockWrapper(this.LengthOfOwnership ,() => this.LengthOfOwnership.selectOption(userdata.vehicleLenghtOfOwnership),true);
        await this.Wrapper.unblockWrapper(this.AnnualMileageForRate ,() => this.AnnualMileageForRate.selectOption(userdata.vehicleMileageForRate),true);
        await this.Wrapper.unblockWrapper(this.saveVehicle ,() => this.saveVehicle.click(),true);
        await this.Wrapper.unblockWrapper(this.savedVehicleSection , () => expect(this.savedVehicleSection).toBeVisible(),true);
        await expect(this.savedYear).toHaveText(userdata.vehicleYear);
        await expect(this.savedMake).toHaveText(userdata.vehicleMake);
        await expect(this.savedModel).toHaveText(userdata.vehicleModel);
        await this.Wrapper.unblockWrapper(this.btnContinue, ()=> this.btnContinue.click(),true);
        await expect(this.progressivePage).toHaveURL(/.*DriversAddPniDetails/);
        await this.progressivePage.waitForLoadState('domcontentloaded');    
    }

}

module.exports = vehiclesAllEdit;