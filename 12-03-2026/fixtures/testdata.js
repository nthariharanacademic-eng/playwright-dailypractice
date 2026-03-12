const base = require('@playwright/test');


exports.customTest = base.test.extend({
    testData :{
        name : 'TEstName',
        num : '123'
    }
});