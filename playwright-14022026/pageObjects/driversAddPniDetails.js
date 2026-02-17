const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');



class driversAddPniDetails {

    /** @param {import('@playwright/test').Page} page  */
    constructor(page) {
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.pageContent = this.progressivePage.locator('fieldset').last();
        this.Gender = this.progressivePage.getByLabel(" Male ",{exact:true});
        //.locator('input[id*=list_Gender]')
        this.MaritalStatus = this.progressivePage.locator('select[id*=list_MaritalStatus]');
        this.EmploymentStatus = this.progressivePage.locator('select[id*=list_EmploymentStatus]');
        this.txt_Occupation = this.progressivePage.locator('input[id*=list_Occupation]');
        this.occupation = this.progressivePage.getByRole('option',{name:'Driver: Bus / School Bus'});
        this.PrimaryResidence = this.progressivePage.locator('select[id*=list_PrimaryResidence]');
        this.LicenseType = this.progressivePage.locator('select[id*=list_LicenseType]');
        this.selectedLicenseType = this.LicenseType.locator()
        this.LicenseStatus = this.progressivePage.locator('select[id*=list_LicenseStatus]');
        this.DriverYearsLicensed = this.progressivePage.locator('select[id*=list_DriverYearsLicensed]');
        //this.HasAccidentsOrClaims = this.progressivePage.locator('input[id*=list_HasAccidentsOrClaims]').getByRole('radio', { name: userdata.HasAccidentsOrClaims });
        this.HasAccidentsOrClaims = this.progressivePage.locator('input[id*=list_HasAccidentsOrClaims]').getByText(userdata.HasAccidentsOrClaims);
        //this.HasTicketsOrViolations = this.progressivePage.locator('input[id*=list_HasTicketsOrViolations]').getByRole('radio', { name: userdata.HasTicketsOrViolations });
        this.HasTicketsOrViolations = this.progressivePage.locator('input[id*=list_HasTicketsOrViolations]').getByText(userdata.HasTicketsOrViolations);
        this.btnContinue = this.progressivePage.getByRole('button',{name:/continue/i});
    }

    async driversAddPniDetails() {
        await this.progressivePage.pause();
        await expect(this.pageContent).toBeVisible();
        await this.Wrapper.unblockWrapper(this.Gender, () => this.Gender.click(),false);
        await this.Wrapper.unblockWrapper(this.MaritalStatus, () => this.MaritalStatus.selectOption(userdata.maritalstatus),true);
        await this.Wrapper.unblockWrapper(this.EmploymentStatus, () => this.EmploymentStatus.selectOption(userdata.employmentstatus),true);
        await this.Wrapper.unblockWrapper(this.txt_Occupation, () => this.txt_Occupation.pressSequentially(userdata.useroccupation),true);
        await this.Wrapper.unblockWrapper(this.occupation,() =>this.occupation.click(),true);
        await this.Wrapper.unblockWrapper(this.PrimaryResidence,() => this.PrimaryResidence.selectOption(userdata.residence),true);
        await expect(this.LicenseType).toHaveText(userdata.licensetype);
        //.toHaveValue(userdata.licensetype);
        await expect(this.LicenseStatus).toHaveText(userdata.licensestatus);
        //toHaveValue(userdata.licensestatus);
        await this.Wrapper.unblockWrapper(this.DriverYearsLicensed,() => this.DriverYearsLicensed.selectOption(userdata.driverlicensedyear),true);
        await this.Wrapper.unblockWrapper(this.HasAccidentsOrClaims,() => this.HasAccidentsOrClaims.click(),false);
        await this.Wrapper.unblockWrapper(this.HasTicketsOrViolations,() => this.HasTicketsOrViolations.click(),false);
        await this.Wrapper.unblockWrapper(this.btnContinue,() => this.btnContinue.click(),true);

        await this.progressivePage.waitForURL(/.*DriversIndex/);
        await this.progressivePage.waitForLoadState('domcontentloaded');

    }


}

module.exports = driversAddPniDetails;