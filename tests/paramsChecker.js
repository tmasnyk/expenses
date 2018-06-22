const assert = require('assert');
const paramsChecker = require('../paramsChecker');

describe('Date param checker Tests', function() {
    it('returns 2017-10-10 = true', function(done) {
        assert.equal(paramsChecker.checkDate('2017-10-10'), true);
        // Invoke done when the test is complete.
        done();
    });

    it('returns 2017/10/10 = false', function(done) {
        assert.equal(paramsChecker.checkDate('2017/10/10'), false);
        // Invoke done when the test is complete.
        done();
    });

    it('returns 2017.10.10 = false', function(done) {
        assert.equal(paramsChecker.checkDate('2017.10.10'), false);
        // Invoke done when the test is complete.
        done();
    });

    it('returns 10,10 = false', function(done) {
        assert.equal(paramsChecker.checkDate('10,10'), false);
        // Invoke done when the test is complete.
        done();
    });
});

describe('Amount param checker Tests', function() {
    it('returns 10.10 = true', function(done) {
        assert.equal(paramsChecker.checkAmount('10.10'), true);
        // Invoke done when the test is complete.
        done();
    });

    it('returns 100 = true', function(done) {
        assert.equal(paramsChecker.checkAmount('100'), true);
        // Invoke done when the test is complete.
        done();
    });

    it('returns 10,10 = false', function(done) {
        assert.equal(paramsChecker.checkAmount('10,10'), false);
        // Invoke done when the test is complete.
        done();
    });

    it('returns -10 = false', function(done) {
        assert.equal(paramsChecker.checkAmount('-10'), false);
        // Invoke done when the test is complete.
        done();
    });
});