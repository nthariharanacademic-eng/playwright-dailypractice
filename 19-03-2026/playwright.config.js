const {defineConfig} = require('@playwright/test');

export default defineConfig({
  testDir : './tests',
  timeout : 30*1000,
  expect  :{
    timeout : 5*1000
  },
  reporter : 'html',
  projects : [
    {
      name : 'chrome',
      use:{
        browserName : 'chromium',
        viewport : null,
        launchOptions : {
          args: ['--start-maximized']
        },
        trace : 'on',
        screenshot : 'on',
        headless : false
      }
    }
  ]
})


