const {detect} = require('detect-browser');
const lineChecker = require('./lineChecker');
const db = require('./db');

checkBrowser();
var tb = document.getElementById("commandLineElement");
console.log(tb)

function checkBrowser() {
    const browser = detect();
    if (browser.name.indexOf('node') > -1) {
        return false;
    } else return true;
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

function outputData(expensesArray) {
    var outputElement = document.getElementById("outputElement");
    for (let expense in expensesArray) {
        let node = document.createElement("LI");
        let expenseAttr = Object.values(expensesArray[expense]); //Output all attribites
        for (let attr in expenseAttr) {
            node.appendChild(document.createTextNode(expenseAttr[attr] + ' '));
        }
        outputElement.appendChild(node)
    }


}

window.inputKeypress = function (e) {
    var outputElement = document.getElementById("outputElement");
    if (e.keyCode == 13) {
        var tb = document.getElementById("commandLineElement");
        var node = document.createElement("P");
        var textnode = document.createTextNode(tb.value);
        node.appendChild(textnode);

        parseLine(tb.value);
        outputElement.appendChild(node);
        tb.value = "";
        return false;
    }


}

function parseLine(expenseLine) {
    var parsedExpense = {};
    parsedExpense = getExpenseCmd(expenseLine.split(" "));

    if (parsedExpense.length === 0) {
       return
    }

    switch (parsedExpense.command) {
        case "ADD":
            lineChecker.checkAddLine(parsedExpense).then(function (res) {
                if (res) {
                    outputData(db.addExpense(parsedExpense));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "LIST":
            lineChecker.checkListLine(parsedExpense).then(function (res) {
                if (res) {
                    // console.log(db.listAllExpense(parsedExpense));
                    outputData(db.listAllExpense(parsedExpense));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "CLEAR":
            lineChecker.checkClearLine(parsedExpense).then(function (res) {
                if (res) {
                    db.clearExpense(parsedExpense);
                    outputData(db.listAllExpense(parsedExpense));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "TOTAL":
            lineChecker.checkTotalLine(parsedExpense).then(function (res) {
                if (res) {
                    outputData(db.totalExpense(parsedExpense));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        default:
            alert('Incorrect command line');
            break;
    }
}




