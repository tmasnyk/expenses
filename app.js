const {detect} = require('detect-browser');
const lineChecker = require('./lineChecker');
const db = require('./db');


checkBrowser();
showHelpBanner();
startConsole();


function checkBrowser() {
    const browser = detect();
    if (browser) {
        console.log(browser.name);
        console.log(browser.version);
        console.log(browser.os);
    }

    if (browser.name.indexOf('node') > -1) {
        return false;
    } else return true;
}

function showHelpBanner() {
    console.log('***********************************');
    console.log('********Commands Example***********');
    console.log('* add 2017-04-26 12.44 USD Jogurt *');
    console.log('* clear 2017-04-26 ****************');
    console.log('* list ****************************');
    console.log('* total EUR ***********************');
    console.log('***********************************');
}

function startConsole() {
    var stdin = process.openStdin();
    stdin.addListener("data", function (line) {
        console.log('_______________________');
        parseLine(line.toString().trim())
    });
}

function getExpenseCmd(expenseArray) {
    let exp = new Object();
    exp.command = expenseArray[0].toUpperCase();
    switch (exp.command) {
        case "ADD":
            if (typeof expenseArray[1] !== 'undefined') {
                exp.date = expenseArray[1];
            }
            if (typeof expenseArray[2] !== 'undefined') {
                exp.amount = expenseArray[2];
            }
            if (typeof expenseArray[3] !== 'undefined') {
                exp.currency = expenseArray[3].toUpperCase();
            }
            if (typeof expenseArray[4] !== 'undefined') {
                exp.name = expenseArray[4];
            }
            break;
        case "LIST":
            break;
        case "CLEAR":
            if (typeof expenseArray[1] !== 'undefined') {
                exp.date = expenseArray[1];
            }
            break;
        case "TOTAL":
            if (typeof expenseArray[1] !== 'undefined') {
                exp.currency = expenseArray[1].toUpperCase();
            }
            break;
    }
    return exp;
}


function parseLine(expenseLine) {
    var parsedExpense = {};
    parsedExpense = getExpenseCmd(expenseLine.split(" "));
    console.log(Object.keys(parsedExpense).length)


    switch (parsedExpense.command) {
        case "ADD":
            lineChecker.checkAddLine(parsedExpense).then(function (res) {
                if (res) {
                    db.addExpense(parsedExpense);
                }
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "LIST":
            lineChecker.checkListLine(parsedExpense).then(function (res) {
                if (res) {
                    db.listAllExpense(parsedExpense);
                }
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "CLEAR":
            lineChecker.checkClearLine(parsedExpense).then(function (res) {
                if (res) {
                    db.clearExpense(parsedExpense)
                }
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "TOTAL":
            lineChecker.checkTotalLine(parsedExpense).then(function (res) {
                if (res) {
                    db.totalExpense(parsedExpense);
                }
            }).catch(function (err) {
                console.log(err);
            })
            break;
        default:
            console.log('Incorrect command line');
            break;
    }
}


//Check params


//External resource



