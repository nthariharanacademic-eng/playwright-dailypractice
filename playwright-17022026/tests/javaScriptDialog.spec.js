const {test, expect} = require('@playwright/test');


test("JavaScript Dialog @DIA", async({page}) =>{

    page.on('dialog',(dialog)=>{
        expect(dialog.message()).toEqual("Hello Test, share this practice page and share your knowledge");
        dialog.accept();
        console.log(dialog.message());
    })

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');    

    //Fieldset can be accessed using role
    const alertbox = page.getByRole('group', {name:/Switch To Alert Example/})
    await expect (alertbox).toBeVisible();
    await alertbox.getByRole('textbox').fill('Test');
    await alertbox.getByRole('button',{name:'Alert'}).click();
    await page.pause();


});

