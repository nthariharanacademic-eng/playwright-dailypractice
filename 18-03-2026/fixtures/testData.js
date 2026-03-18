const base = require('@playwright/test');


exports.customTest= base.test.extend({
    testData1 : {
        name : "test1",
    },
    testData2 : {
        name : "test2"
    }
});