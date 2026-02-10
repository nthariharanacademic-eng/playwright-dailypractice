import { defineConfig } from "@playwright/test";


export default defineConfig({
    testDir : './tests',
    timeout : 30*1000,
    expect : {
        timeout : 10*1000
    },
    reporter : "html",
    use:{
        browserName : 'chromium',
        headless : true,
        screenshot : 'on',
        trace : 'on'
    },
    
});