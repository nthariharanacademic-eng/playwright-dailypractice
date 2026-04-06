const {test} = require('../fixtures/testData');

test.describe("Access testdata via Fixtures", async()=>{
    test("@FIX", async({testData})=>{
        console.log("Test Data =>", testData);
    });
});