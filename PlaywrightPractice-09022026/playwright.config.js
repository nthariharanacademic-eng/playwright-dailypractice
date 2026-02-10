import {defineConfig, devices} from '@playwright/test';


export default defineConfig({
    testDir : './tests',
    timeout : 60*1000,
    expect : {
        timeout: 20*1000
    },
    reporter : 'html',
    projects:[
        {
            name:'chrome',
            use:{
                channel : 'chrome', // Using system installed chrome and not the browser bundled with playwright.
                ...devices['Desktop Chrome'], //Emulating the chrome desktop settings for viewing.
                trace : 'on',
                screenshot: 'on',
                video : 'on'
            }
        }
    ]
});


