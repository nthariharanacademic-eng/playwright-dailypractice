const { expect } = require('@playwright/test');
const userdata = require('../utils/userdata.json');
const wrapper = require('../utils/wrapper');



class driversAddPniDetails {

    /** @param {import('@playwright/test').Page} page  */
    constructor(page) {
        this.progressivePage = page;
        this.Wrapper = new wrapper(page);

        this.pageContent = this.progressivePage.locator('fieldset').last();
        this.Gender = this.progressivePage.locator('input[id*=list_Gender]').getByRole('radio', { name: "Male", exact: true });
        this.MaritalStatus = this.progressivePage.locator('select[id*=list_MaritalStatus]');
        this.EmploymentStatus = this.progressivePage.locator('select[id*=list_EmploymentStatus]');
        this.txt_Occupation = this.progressivePage.locator('input[id*=list_Occupation]');
        this.occupation = this.progressivePage.getByRole('option',{name:'Driver: Bus / School Bus'});
        this.PrimaryResidence = this.progressivePage.locator('select[id*=list_PrimaryResidence]');
        this.LicenseType = this.progressivePage.locator('select[id*=list_LicenseType]');
        this.LicenseStatus = this.progressivePage.locator('select[id*=list_LicenseStatus]');
        this.DriverYearsLicensed = this.progressivePage.locator('select[id*=list_DriverYearsLicensed]');
        this.HasAccidentsOrClaims = this.progressivePage.locator('input[id*=list_HasAccidentsOrClaims]').getByRole('radio', { name: userdata.HasAccidentsOrClaims });
        this.HasTicketsOrViolations = this.progressivePage.locator('input[id*=list_HasTicketsOrViolations]').getByRole('radio', { name: userdata.HasTicketsOrViolations });
        this.btnContinue = this.progressivePage.getByRole('button',{name:/continue/i});
    }

    async driversAddPniDetails() {

        await expect(this.pageContent).toBeVisible();
        await this.Wrapper.unblockWrapper(this.Gender, () => this.Gender.click());
        await this.Wrapper.unblockWrapper(this.MaritalStatus, () => this.MaritalStatus.selectOption(userdata.maritalstatus));
        await this.Wrapper.unblockWrapper(this.EmploymentStatus, () => this.EmploymentStatus.selectOption(userdata.employmentstatus));
        await this.Wrapper.unblockWrapper(this.txt_Occupation, () => this.txt_Occupation.pressSequentially(userdata.useroccupation));
        await this.Wrapper.unblockWrapper(this.occupation,() =>this.occupation.click());
        await this.Wrapper.unblockWrapper(this.PrimaryResidence,() => this.PrimaryResidence.selectOption(userdata.residence));
        await expect(this.LicenseType).toHaveValue(userdata.licensetype);
        await expect(this.LicenseStatus).toHaveValue(userdata.licensestatus);
        await this.Wrapper.unblockWrapper(this.DriverYearsLicensed,() => this.DriverYearsLicensed.selectOption(userdata.driverlicensedyear));
        await this.Wrapper.unblockWrapper(this.HasAccidentsOrClaims,() => this.HasAccidentsOrClaims.click());
        await this.Wrapper.unblockWrapper(this.HasTicketsOrViolations,() => this.HasTicketsOrViolations.click());
        await this.Wrapper.unblockWrapper(this.btnContinue,() => this.btnContinue.click());

        await this.progressivePage.waitForURL(/.*DriversIndex/);
        await this.progressivePage.waitForLoadState('domcontentloaded');

    }


}

module.exports = driversAddPniDetails;