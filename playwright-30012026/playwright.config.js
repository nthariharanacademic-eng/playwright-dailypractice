import {defineConfig} from '@playwright/test';


export default defineConfig({
    testDir : './tests',
    timeout : 30*1000,
    expect : {
        timeout: 10*1000
    } ,
    reporter : 'html',
    use:{
        browserName : 'chromium',
        trace : 'on',
        screenshot : 'on',
        viewport : null,
        ignoreHTTPSErrors : true
    }
});