const {customTest} = require('../fixtures/testData');



customTest("Data driven by Fixtures @DATAFIX", async({testData1 , testData2})=>{
    console.log(testData1);
    console.log(testData2);
});