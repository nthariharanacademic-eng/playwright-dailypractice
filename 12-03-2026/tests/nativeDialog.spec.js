const {test,expect} = require('@playwright/test');


test("Native Dialog @DIA", async({page})=>{

    const endPoint = "https://rahulshettyacademy.com/AutomationPractice/";
    const userName = "Test";
    const msgAlert = `Hello ${userName}, share this practice page and share your knowledge`
    const alertSection = page.getByRole('group',{name:"Switch To Alert Example"});
    const alertTxtBox = alertSection.getByRole('textbox');
    const btnAlert = alertSection.getByRole('button',{name:'Alert'});

    /** Listener */
    page.on('dialog',(dialog)=>{
        expect(dialog.message()).toMatch(msgAlert);
        console.log(dialog.message());
        dialog.accept();
    });

    await page.goto(endPoint);
    await expect(alertSection).toBeVisible();
    await alertTxtBox.fill(userName);
    await btnAlert.click();
});