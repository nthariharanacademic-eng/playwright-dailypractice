const {test,expect} = require('@playwright/test');


test("JavaScript Dialog Box @DIA", async({page})=>{

    const alertSection = page.getByRole('group',{name:/switch to alert/i}); //Previously used placeholder to identify.Now moved to Group
    const txtboxAlert = alertSection.getByRole('textbox');
    const btnAlert = alertSection.getByRole('button',{name:'Alert'});


    //Listener for dialogbox. Logs the message to console
    page.on('dialog',async (dialog)=>{
        expect(dialog.message()).toContain("share your knowledge");
        console.log(dialog.message());
        await dialog.accept();
    });


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/",{waitUntil:'domcontentloaded'});
    await expect(txtboxAlert).toBeVisible();
    await txtboxAlert.fill('Test');
    await btnAlert.click();

});

/**
 * Note to myself:
 *  As per HTML Accessibility API Mappings (AAM), fieldset can be accessed
 * with role = group and legend tag text as the name.
 * Reference : https://www.w3.org/WAI/tutorials/forms/grouping/
 * 
 * Used that to chain other fields.
 *  
 * 
 */
