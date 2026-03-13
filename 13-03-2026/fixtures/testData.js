/** testData exported as Fixture */

const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testData : {
        data1 : { name : "name1" },
        data2 : { name : "name2" }
    }
    
});