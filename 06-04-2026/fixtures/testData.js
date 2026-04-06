const base = require('@playwright/test');

exports.test = base.test.extend({
    testData : {
        set1 : { name: 'Test1', dob:'01011990'},
        set2 : { name : 'test2', dob: '01011999'}
    }
});