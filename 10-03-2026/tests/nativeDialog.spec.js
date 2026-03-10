const {test , expect}  = require('@playwright/test');


test("Native Dialog Box @DIA", async({page})=>{

        const endPoint = "https://rahulshettyacademy.com/AutomationPractice/";
        const alertSection = page.getByRole('group',{name : 'Switch To Alert Example'});
        const txtAlert = alertSection.getByRole('textbox');
        const userName = "Test";
        const btnAlert = alertSection.getByRole('button',{name : /alert/i});
        const alertMsg = `Hello ${userName}, share this practice page and share your knowledge`;

        /** Listener */
        page.on('dialog',(dialog)=>{
            expect(dialog.message()).toMatch(alertMsg);
            console.log(dialog.message());
            dialog.accept();
        });


        await page.goto(endPoint);
        await expect(alertSection).toBeVisible();
        await txtAlert.fill(userName);
        await btnAlert.click();
});