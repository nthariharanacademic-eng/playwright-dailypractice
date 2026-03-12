const {customTest} = require('../fixtures/testdata');

customTest("Test Fixtures @FIX", async({testData})=>{
    console.log("Test");
    console.log(testData);
});