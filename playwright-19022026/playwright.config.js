const {defineConfig} = require('@playwright/test');
const dotenvx = require('@dotenvx/dotenvx');


dotenvx.config(); //load .env file

export default defineConfig({
    testDir : './tests',
    timeout: 30*1000,
    expect:{
        timeout: 10*1000
    },
    reporter: [["line"], ["allure-playwright"]],
    projects : [
        {
            name:'chrome',
            use:{
                channel:'chrome',
                viewport : null,
                launchOptions:{
                    args : ['--start-maximized']
                },
                trace : 'on',
                screenshot : 'on',
                headless : false
            }
        }
    ]
});