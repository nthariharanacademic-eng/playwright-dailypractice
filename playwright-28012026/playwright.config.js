import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir : './tests',
    timeout : 30*1000,
    expect : {
        timeout : 10*1000
    },
    reporter : 'html',
    use:{
        browserName : 'chromium',
        trace : 'on',
        viewport: null,
        launchOptions:{
            args: ["--start-maximized"]
        },
        video: 'on'
    }
});