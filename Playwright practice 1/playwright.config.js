// @ts-check
import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 20* 1000,
 
  //workers : 2,
  //fullyParallel: true,
  expect: {
    timeout: 10 * 1000
  },

  use: {
    headless: true,
    browserName: 'chromium',
    screenshot: 'on',
    trace : 'on'

  },

});

