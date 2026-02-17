const {defineConfig} = require('@playwright/test');

export default defineConfig({
    testDir :'./tests',
    timeout : 30*1000,
    expect : {
        timeout : 10*1000
    },
    reporter : 'html',
    projects :[
        {
            name: 'chrome',
            use:{
                channel : 'chrome',
               // viewport : null,
                launchOptions:{
                    args : ['--start-maximized']
                },
                trace : 'on',
                screenshot : 'on',
                headless : true
            }
        }
    ]
})