const ExcelJS = require('exceljs');
const { test, expect } = require("@playwright/test");

let row_num, col_num = 0;

async function readExcel(inputFilePath, SheetName, searchText, replaceText) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputFilePath);
    const sheet = workbook.getWorksheet(SheetName);

    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                row_num = rowNumber;
                col_num = colNumber + 2;
            }
        });
    });

    if (row_num != 0 && col_num != 0) {
        await writeExcel(sheet, workbook, inputFilePath, replaceText);
    } else {
        console.log("Search Text Not Found");
    }


};

async function writeExcel(sheet, workbook, inputFilePath, replaceText) {
    const cell = await sheet.getCell(row_num, col_num);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(inputFilePath);
}


async function uploadFile(page,filePath) {
    await page.locator(".upload").click();
    await page.locator(".upload").setInputFiles(filePath);
}



test("Excel Util @EXCL", async ({ page }) => {
    const search_text ="Kivi";
    const replace_text = "1234";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.locator(".table-wrapper").waitFor();
    //watch out for download event.
    const download_Resp = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();

    //resolved promise stored.
    const obj_download = await download_Resp;

    const fileName = await obj_download.suggestedFilename();
    const filePath = "C:\\Users\\61094258\\Downloads\\"+fileName ;
    console.log("filePath =>", filePath);
    await obj_download.saveAs(filePath);
    await readExcel(filePath, "Sheet1",search_text, replace_text);
    await uploadFile(page,filePath);

    await page.locator(".table-wrapper").waitFor();
    const row_locator = await page.locator("[role='row']").filter({hasText: search_text});
    await expect(row_locator.locator("[data-column-id='4']")).toHaveText(replace_text);
});