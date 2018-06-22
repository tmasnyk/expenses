const assert = require('assert');
const lineChecker = require('../lineChecker');

describe('Commandline checker Tests', function() {
    // And then we describe our testcases.
    let addExcpense = {
        command: 'ADD',
        date: '2017-10-10',
        amount: 12.55,
        currency: 'USD',
        name: 'Paper'
    }
     it('returns 5USD -> EUR = 5.59', function(done) {
         assert.equal(lineChecker.checkListLine(addExcpense), 5.59);
         // Invoke done when the test is complete.
         done();
     });
});