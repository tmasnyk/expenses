const {detect} = require('detect-browser');
const lineChecker = require('./lineChecker');
const db = require('./db');

checkBrowser();
var tb = document.getElementById("commandLineElement");
console.log(tb)

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

function outputData(expensesArray) {
    var outputElement = document.getElementById("outputElement");
    for (let expense in expensesArray) {
        let node = document.createElement("LI");
        let expenseAttr = Object.values(expensesArray[expense]); //Output all attribites
        for (let attr in expenseAttr) {
            console.log('attr', expenseAttr[attr])
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
    var parsedExpense = [];
    expenseLine.split(" ").map(res => {
        parsedExpense.push(res);
    })

    var command;
    if (parsedExpense.length > 0) {
        command = parsedExpense[0];
    } else return;

    switch (command) {
        case "add":
            lineChecker.checkAddLine(parsedExpense).then(function (res) {
                if (res) {
                    outputData(db.addExpense(parsedExpense));
                }
            })
            break;
        case "list":
            lineChecker.checkListLine(parsedExpense).then(function (res) {
                if (res) {
                    // console.log(db.listAllExpense(parsedExpense));
                    outputData(db.listAllExpense(parsedExpense));
                }
            })
            break;
        case "clear":
            lineChecker.checkClearLine(parsedExpense).then(function (res) {
                if (res) {
                    db.clearExpense(parsedExpense);
                    outputData(db.listAllExpense(parsedExpense));
                }
            })
            break;
        case "total":
            lineChecker.checkTotalLine(parsedExpense).then(function (res) {
                if (res) {
                    outputData(db.totalExpense(parsedExpense));
                }
            })
            break;
        default:
            alert('Incorrect command line');
            break;
    }
}




