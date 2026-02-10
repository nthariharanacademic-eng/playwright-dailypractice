import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 200 * 1000,
    expect: {
        timeout: 10 * 1000
    },
    reporter : 'html',
    projects: [
        // {
        //     name: 'chrome',
        //     use: {
        //         channel: 'chrome',
        //         ...devices['Desktop Chrome'],
        //         screenshot: 'on',
        //         trace: 'on',
        //         ignoreHTTPSErrors: true
        //     }
        // },
        {
            name: 'edge',
            use: {
                channel: 'msedge',
                ...devices['Desktop Edge'],
                screenshot: 'on',
                trace: 'on',
                ignoreHTTPSErrors: true
            }
        }
    ]
});