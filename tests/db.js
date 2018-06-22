const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect;
var chaiMatchPattern = require('chai-match-pattern');
var _ = chaiMatchPattern.getLodashModule();

const assertArrays = require('chai-arrays');
chai.use(assertArrays);

const db = require('../db');


describe('Db tests', function () {
    it('should return array exp objects', function(done) {
        const exp = {
            date: '2017-10-10',
            amount: 10,
            currency: 'USD',
            name: 'phone' + Math.random()
        }
        expect(db.listAllExpense()).to.be.array();
        done();
    });

    it('add to db should return array exp objects with added object', function(done) {
        const exp = {
            date: '2017-10-10',
            amount: 12,
            currency: 'USD',
            name: 'phone' + Math.random() //For different objects
        }
        expect(db.addExpense(exp)).to.have.deep.include(exp);
        done();
    });

    it('add to db should return array exp objects with added object', function(done) {
        const exp = {
            date: '2017-10-10',
            amount: 12,
            currency: 'USD',
            name: 'phone' + Math.random() //For different objects
        }
        expect(db.clearExpense(exp)).to.be.array();
        done();
    });
});