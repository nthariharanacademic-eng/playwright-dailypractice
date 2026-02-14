const { test } = require('@playwright/test');
const poManager = require('../pageObjects/poManager');

test("Get Insurance Quote @QUOTE", async ({ page }) => {

    const pageObjectManager = new poManager();
    await pageObjectManager.getPolicyGeniusPage(page);

    await pageObjectManager.getPolicyGeniusPage(page);
    await pageObjectManager.page_policyGenius.navigateToPolicyGenius("https://www.policygenius.com/auto-insurance/");
    await pageObjectManager.page_policyGenius.partnerOffers();

    const progressivePage = await pageObjectManager.page_policyGenius.getProgressivePage();

    await pageObjectManager.getProgressivePage(progressivePage);
    await pageObjectManager.page_progressive.checkForLayout(); 
    await pageObjectManager.page_progressive.NameEdit();

    await pageObjectManager.getAddressEdit(progressivePage);
    await pageObjectManager.page_addressEdit.addressEdit();

    await pageObjectManager.getVehiclesAllEdit(progressivePage)
    await pageObjectManager.page_vehiclesAllEdit.vehiclesAllEdit();

    await pageObjectManager.getDriversAddPniDetails(progressivePage);
    await pageObjectManager.page_driversAddPniDetails.driversAddPniDetails();

    await pageObjectManager.getDriversIndex(progressivePage);
    await pageObjectManager.page_driversIndex.driversIndex();

    await pageObjectManager.getDriversEditNoCreditHitPniDetails(progressivePage);
    await pageObjectManager.getDriversEditNoCreditHitPniDetails
});
