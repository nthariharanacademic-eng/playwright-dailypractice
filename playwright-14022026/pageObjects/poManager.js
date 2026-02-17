const policyGenius = require('./policyGenius');
const progressive = require('./progressive');
const addressEdit = require('./addressEdit');
const vehiclesAllEdit = require('./vehiclesAllEdit');
const driversAddPniDetails = require('./driversAddPniDetails');
const driversIndex = require('./driversIndex');
const driversEditNoCreditHitPniDetails = require('./driversEditNoCreditHit.js');

class poManager {
    
    async getPolicyGeniusPage(page){
        this.page_policyGenius = new policyGenius(page);
        
    }
    
    async getProgressivePage(page){
        this.page_progressive = new progressive(page);
    }

    async getAddressEdit(page) {
        this.page_addressEdit = new addressEdit(page);

    }

    async getVehiclesAllEdit(page){
        this.page_vehiclesAllEdit = new vehiclesAllEdit(page);
    }

    async getDriversAddPniDetails(page) {
        this.page_driversAddPniDetails = new driversAddPniDetails(page);
    }

    async getDriversIndex(page) {
        this.page_driversIndex = new driversIndex(page);
    }

    async getDriversEditNoCreditHitPniDetails(page){
        this.page_driversEditNoCreditHit = new driversEditNoCreditHitPniDetails(page);
    }
    
}

module.exports = poManager;