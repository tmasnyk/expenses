const assert = require('assert');
const expect = require('expect.js')
const lineChecker = require('../lineChecker');


describe('add commandline checker Tests', function () {
    it('right object add resolve true', function (done) {
        lineChecker.checkAddLine({
            command: 'ADD',
            date: '2017-10-10',
            amount: 100.10,
            currency: 'USD',
            name: 'iphone'
        }).then(function (res) {
            expect(res).to.equal(true);
        }).catch(function (err) {

        })
        done();
    });

    it('wrong expense object parameter will reject with problem cause (date)', function (done) {
        lineChecker.checkAddLine({
            command: 'ADD',
            date: '2017.10.10',
            amount: 100.10,
            currency: 'USD',
            name: 'iphone'
        }).then(function (res) {
            //expect(result).to.equal('Da problem');
        }).catch(function (err) {
            expect(err).to.equal('Date problem');
        })
        done();
    });

    it('wrong expense object parameter will reject with problem cause (amount)', function (done) {
        lineChecker.checkAddLine({
            command: 'ADD',
            date: '2017-10-10',
            amount: -100.10,
            currency: 'USD',
            name: 'iphone'
        }).then(function (res) {
            //expect(result).to.equal('Da problem');
        }).catch(function (err) {
            expect(err).to.equal('Amount problem');
        })
        done();
    });

    it('wrong expense object parameter will reject with problem cause (currency)', function (done) {
        lineChecker.checkAddLine({
            command: 'ADD',
            date: '2017-10-10',
            amount: 100.10,
            currency: 'USD',
            name: 'iphone'
        }).then(function (res) {

        }).catch(function (err) {
            expect(err).to.equal('Wrong currency' || "Can't get currency");
        })
        done();
    });
});


describe('clear commandline checker Tests', function () {
    it('right object resolve true', function (done) {
        lineChecker.checkAddLine({
            command: 'CLEAR',
            date: '2017-10-10',
        }).then(function (res) {
            expect(res).to.equal(true);
        }).catch(function (err) {

        })
        done();
    });

    it('wrong expense object parameter will reject with problem cause (date)', function (done) {
        lineChecker.checkClearLine({
            command: 'CLEAR',
            date: '2017-10-10',
        }).then(function (res) {

        }).catch(function (err) {
            expect(err).to.equal('Date problem');
        })
        done();
    });

    it('wrong expense object parameter number will reject with problem cause', function (done) {
        lineChecker.checkClearLine({
            command: 'CLEAR'
        }).then(function (res) {

        }).catch(function (err) {
            expect(err).to.equal('Wrong parameters number');
        })
        done();
    });

});

describe('total commandline checker Tests', function () {
    it('right object resolve true', function (done) {
        lineChecker.checkTotalLine({
            command: 'TOTAL',
            currency: 'UAH',
        }).then(function (res) {
            expect(res).to.equal(true);
        }).catch(function (err) {

        })
        done();
    });

    it('wrong expense object parameter will reject with problem cause (currency)', function (done) {
        lineChecker.checkTotalLine({
            command: 'TOTAL',
            currency: 'UAA',
        }).then(function (res) {

        }).catch(function (err) {
            expect(err).to.equal('Wrong currency');
        })
        done();
    });

    it('wrong expense object parameter number will reject with problem cause', function (done) {
        lineChecker.checkTotalLine({
            command: 'TOTAL'
        }).then(function (res) {

        }).catch(function (err) {
            expect(err).to.equal('Wrong parameters number');
        })
        done();
    });

});