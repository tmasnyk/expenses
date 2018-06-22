const lineChecker = require('./lineChecker');
const db = require('./db');


showHelpBanner();
startConsole();


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

function getExpenseObj(expenseArray) {
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
    var expenseObj;
    expenseObj = getExpenseObj(expenseLine.split(" "));
    switch (expenseObj.command) {
        case "ADD":
            lineChecker.checkAddLine(expenseObj).then(function () {
                console.log(db.addExpense(expenseObj));
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "LIST":
            lineChecker.checkListLine(expenseObj).then(function () {
                console.log(db.listAllExpense(expenseObj));
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "CLEAR":
            lineChecker.checkClearLine(expenseObj).then(function () {
                db.clearExpense(expenseObj);
                console.log(db.listAllExpense(expenseObj));
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case "TOTAL":
            lineChecker.checkTotalLine(expenseObj).then(function () {
                console.log(db.totalExpense(expenseObj));
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



