const lineChecker = require('./lineChecker');
const db = require('./db');

//Parse commandline into object
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

function outputData(expensesArray) {
    var outputElement = document.getElementById("outputElement");
    for (let expense in expensesArray) {
        let node = document.createElement("LI");
        let expenseAttr = Object.values(expensesArray[expense]);
        for (let attr in expenseAttr) {
            node.appendChild(document.createTextNode(expenseAttr[attr] + ' '));
        }
        outputElement.appendChild(node)
    }
}

//Parse commandline
function parseLine(expenseLine) {
    var expenseObj;
    expenseObj = getExpenseObj(expenseLine.split(" "));

    switch (expenseObj.command) {
        case "ADD":
            lineChecker.checkAddLine(expenseObj).then(function (res) {
                if (res) {
                    outputData(db.addExpense(expenseObj));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "LIST":
            lineChecker.checkListLine(expenseObj).then(function (res) {
                if (res) {
                    outputData(db.listAllExpense(expenseObj));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "CLEAR":
            lineChecker.checkClearLine(expenseObj).then(function (res) {
                if (res) {
                    db.clearExpense(expenseObj);
                    outputData(db.listAllExpense(expenseObj));
                }
            }).catch(function (err) {
                alert(err)
            })
            break;
        case "TOTAL":
            lineChecker.checkTotalLine(expenseObj).then(function (res) {
                if (res) {
                    outputData(db.totalExpense(expenseObj));
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

window.inputKeypress = function (e) {
    var outputElement = document.getElementById("outputElement");
    if (e.keyCode == 13) {
        var input = document.getElementById("commandLineElement");
        var node = document.createElement("P");
        var textnode = document.createTextNode(input.value);
        node.appendChild(textnode);

        parseLine(input.value);
        outputElement.appendChild(node);
        input.value = "";
        return false;
    }
}




