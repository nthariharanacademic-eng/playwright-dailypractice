const {defineConfig} = require('@playwright/test');


export default defineConfig({
    testDir : './tests',
    timeout : 180*1000,
    expect : {
        timeout :  40*1000
    },
    reporter :'html',
    projects : [
        {
            name : 'chrome',
            use:{
                channel:'chrome',
                viewport : null,
                launchOptions:{
                    args : ['--start-maximized']
                },
                trace : 'on',
                screenshot :'on',
                headless : false
            }
        }
    ]
});