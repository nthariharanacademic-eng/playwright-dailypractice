import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir : './tests',
    timeout : 20*1000,
    expect : {
        timeout: 10*1000
    },
    reporter : 'html',
    projects : [
        {
            name : 'chrome',
            use:{
                channel : 'chrome',
                ...devices['Desktop Chrome'],
                trace : 'on',
                screenshot : 'on'
            }
        }
    ]
});