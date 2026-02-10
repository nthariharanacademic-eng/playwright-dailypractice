import{test,expect} from '@playwright/test';

test("testapp @testapp", async({page})=>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // await page.pause();
    //await page.goto("https://www.progressive.com/lp/auto-compare/");
    await page.goto("https://www.progressive.com/lp/auto-compare/?code=8016000082&zipcode=76205&src_cd=AAAGR4E3RARPY34BS2QBPAVFFX7UCACK2U&phone=80161&nd=99&own=1&nv=99&scd=Policygenius&ag=8&gad_source=7&dclid=CPyrqJqgzJIDFVeCYwYd6JMCuA");
    if (await page.getByRole("button",{name:/get a quote/i}).isVisible()){
        await page.getByRole("button",{name:/get a quote/i}).click();
    } else{
        await page.getByRole("button",{name:/continue/i}).click();
    }
    await expect(page.locator(".main-content")).toBeVisible();
    await page.getByRole('textbox',{name:/first name/i}).fill("test123");
    await page.getByRole("textbox",{name:/last name/i}).fill("lastname");
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('01/01/1990');
    await page.getByRole('textbox', { name: 'Primary email address Input' }).fill("no@spammail.com");
    await page.getByRole('button',{name:/continue/i}).click();
    await expect(page.locator('.address-form-group')).toBeVisible();
    await page.getByRole('combobox', { name: 'Street number and name' }).fill('1001 goose ln');
    await page.getByRole('button', { name: 'Ok, start my quote' }).click();
    
    await expect(page.getByLabel('Year*')).toBeVisible();
    await page.getByLabel('Year*').selectOption('2026');
    await expect(page.getByLabel('Make*')).toBeVisible();
    await page.getByLabel('Make*').selectOption('Acura');
    await expect(page.getByLabel('Model*')).toBeVisible();
    await page.getByLabel('Model*').selectOption('Integra');
    
    await expect(page.getByLabel('Learn more aboutVehicle use*')).toBeVisible();  
    await page.getByLabel('Learn more aboutVehicle use*').selectOption("Commute (to/from work or school)");

    await expect(page.getByRole('checkbox', { name: 'I also use this vehicle for' })).toBeVisible();
    await page.getByRole('checkbox', { name: 'I also use this vehicle for' }).check();

    await expect(page.getByLabel('Days per week this vehicle is')).toBeVisible();
    await page.getByLabel('Days per week this vehicle is').selectOption('1');
    await page.getByRole('textbox', { name: 'Miles driven to school/work' }).fill('2');
    await page.getByLabel('Own or lease?').selectOption('Finance');
    await page.getByLabel('How long have you had this').selectOption('Less than 1 month');
    await page.getByLabel('Learn more aboutAnnual').selectOption('4,000 - 5,999');
   
    await page.getByRole('button', { name: 'Save vehicle' }).click();
    await page.getByRole('button', { name: /continue/i }).click();
   
});