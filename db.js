const low = require('lowdb')
const {detect} = require('detect-browser');
const currencies = require('./currencies');

var db;

//init empty db
initDB();


function isBrowser() {
    const browser = detect();
    if (browser && browser.name.indexOf('node') > -1) {
        return false;
    } else {
        return true;
    }
}

//Run commands
function addExpense(expense) {
    return exp = db.get('expenses')
        .push({
            date: expense.date,
            amount: expense.amount,
            currency: expense.currency,
            name: expense.name
        })
        .write()
}

function clearExpense(expense) {
    const exp = db.get('expenses')
        .remove({date: expense.date})
        .write()
    console.log('Clear', exp)
    return exp
}

function totalExpense(expense) {
    let total = 0;
    let resp = [];
    db.get('expenses')
        .value()
        .map(exp => {
            if (exp.currency.indexOf(expense.currency) > -1) {
                total += parseFloat(exp.amount);
            } else {
                total += currencies.convertCurrency(exp.currency, expense.currency, exp.amount);
            }

        });
    resp.push({
        amount: Number(total.toFixed(2)),
        currency: expense.currency
    });
    return resp;
}

function listAllExpense() {
    const exp = db.get('expenses')
        .value()
    return exp;
}

function initDB() {
    if (isBrowser()) {
        const LocalStorage = require('lowdb/adapters/LocalStorage');
        const adapter = new LocalStorage('db')
        db = low(adapter);
    } else {
        const FileSync = require('lowdb/adapters/FileSync')
        const adapter = new FileSync('db.json')
        db = low(adapter);
    }
    db.defaults({expenses: []})
        .write()
}

module.exports.addExpense = addExpense;
module.exports.clearExpense = clearExpense;
module.exports.totalExpense = totalExpense;
module.exports.listAllExpense = listAllExpense;
