const base = require('@playwright/test');
const {expect} = base;

exports.test = base.test.extend({
    sessionFile : 
    /*** @param {{context : import('@playwright/test').BrowserContext}}  */
    async({context},use)=>{
        const BASEURL = 'https://rahulshettyacademy.com/client/';
        const filePath = './storage/session.json';
        const page = await context.newPage();
        await page.goto(BASEURL);

        const txtBoxMail = page.getByRole('textbox',{name:/email@example/i});
        const txtBoxPwd = page.getByRole('textbox',{name: /passsword/i});
        const btnLogin = page.getByRole('button',{name:/login/i});
        const navbar = page.getByRole('navigation');

        await base.expect(txtBoxMail).toBeVisible();
        await txtBoxMail.fill(process.env.MAIL_ID);
        await txtBoxPwd.fill(process.env.PWD);
        await btnLogin.click();
        await expect(navbar).toBeVisible();

        await context.storageState({path:filePath}); //If needed we can add validation for file presence as well
        //Cleanup
        await context.close();
        await use(filePath);
        
    }
});

exports.expect = base.expect;