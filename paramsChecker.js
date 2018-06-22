function checkDate(dateStr) {
    var dateReg = /^\d{4}\-\d{1,2}\-\d{1,2}$/
    return dateReg.test(dateStr);
}

function checkAmount(amountStr) {
    var numReg = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/
    return numReg.test(amountStr)
}

module.exports.checkDate = checkDate;
module.exports.checkAmount = checkAmount;



