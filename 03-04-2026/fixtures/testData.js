const base = require('@playwright/test');


exports.test = base.test.extend({
    testData1: {name : "test1", text : "test1"},
    testData2: {name : "test2", text: "test2"}
});