const base = require('@playwright/test');

exports.test = base.test.extend({
    testData:{
        data1 :{name : "test1"},
        data2 : {name : "test2"}
    }
});