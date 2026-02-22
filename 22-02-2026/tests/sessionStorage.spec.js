const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {


    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const email = page.getByRole('textbox', { name: /email/i });
        const pwd = page.getByRole('textbox', { name: /pass/i });
        const btn = page.getByRole('button', { name: /login/i });

        await page.goto("https://rahulshettyacademy.com/client/", { waitUntil: 'domcontentloaded' });
        await expect(email).toBeVisible();
        await expect(pwd).toBeVisible();
        await email.fill(process.env.mail);
        await pwd.fill(process.env.pwd);
        await btn.click();
        await expect(page.getByRole('navigation')).toBeVisible();
        await context.storageState({ path: './teststorage/state.json' });
        await context.close();
    });

    //test.use({ storageState: './teststorage/state.json' }); //either this line or you should manually add it to Browser context.

    test('Session Storage @STOR', async ({ browser }) => {
        const context = await browser.newContext({storageState:'./teststorage/state.json'});
        //const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/client/", { waitUntil: 'domcontentloaded' });
        await expect(page.getByRole('navigation')).toBeVisible();

        await context.close();

    });

    test.afterAll('delete program created files',()=>{

    })



});
