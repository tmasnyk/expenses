const paramsChecker = require('./paramsChecker');
const currencies = require('./currencies');

//Checks whole lines
function checkAddLine(expense) {
    return new Promise(function (resolve, reject) {
        console.log(expense)
        if (Object.keys(expense).length !== 5) {
            reject('Wrong parameters number');
        } else if (!paramsChecker.checkDate(expense.date)) {
            reject('Date problem');
        } else if (!paramsChecker.checkAmount(expense.amount)) {
            reject('Amount problem');
        } else currencies.checkCurrency(expense.currency).then(function (res) {
            if (res) {
                resolve(true);
            }
        }).catch(function (err) {
            reject(err)
        })
    })
}

function checkClearLine(expense) {
    return new Promise(function (resolve, reject) {
        if (Object.keys(expense).length !== 2) {
            console.log('Wrong parameters number')
            reject('Wrong parameters number');
        } else if (!paramsChecker.checkDate(expense.date)) {
            console.log('Date problem')
            reject('Date problem');
        } else resolve(true);
    })
}

function checkListLine(expense) {
    return new Promise(function (resolve, reject) {
        if (Object.keys(expense).length !== 1) {
            console.log('Wrong parameters number')
            reject('Wrong parameters number');
        } else resolve(true);
    })
}

function checkTotalLine(expense) {
    return new Promise(function (resolve, reject) {
        console.log(expense)
        if (Object.keys(expense).length !== 2) {
            console.log('Wrong parameters number')
            reject('Wrong parameters number');
        } else currencies.checkCurrency(expense.currency.toUpperCase()).then(function (res) {
            if (res) {
                resolve(true);
            }
        }).catch(function (err) {
            reject(err);
        })
    })
}


module.exports.checkAddLine = checkAddLine;
module.exports.checkClearLine = checkClearLine;
module.exports.checkListLine = checkListLine;
module.exports.checkTotalLine = checkTotalLine;