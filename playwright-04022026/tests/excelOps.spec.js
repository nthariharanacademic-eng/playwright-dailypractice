import {test} from '@playwright/test';


test("Excel OPS @EXCL", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.getByRole("table").waitFor();
    



});