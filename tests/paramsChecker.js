const assert = require('assert');
const paramsChecker = require('../paramsChecker');

describe('Date param checker Tests', function() {
    it('right date format 2017-10-10', function(done) {
        assert.equal(paramsChecker.checkDate('2017-10-10'), true);
        done();
    });

    it('should not accept date in format 2017/10/10', function(done) {
        assert.equal(paramsChecker.checkDate('2017/10/10'), false);
        done();
    });

    it('should not accept date in format 2017.10.10', function(done) {
        assert.equal(paramsChecker.checkDate('2017.10.10'), false);
        done();
    });

    it('should not accept wrong date data 10,10', function(done) {
        assert.equal(paramsChecker.checkDate('10,10'), false);
        done();
    });
});

describe('Amount param checker Tests', function() {
    it('accept float 10.10', function(done) {
        assert.equal(paramsChecker.checkAmount('10.10'), true);
        done();
    });

    it('accept integer 100', function(done) {
        assert.equal(paramsChecker.checkAmount('100'), true);
        done();
    });

    it('should not accept float with commas 10,10', function(done) {
        assert.equal(paramsChecker.checkAmount('10,10'), false);
        done();
    });

    it('negative amounts should not accept -10', function(done) {
        assert.equal(paramsChecker.checkAmount('-10'), false);
        done();
    });
});