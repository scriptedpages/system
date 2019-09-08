var myGlobalNumberVariable = 1;
inputNumber.text = myGlobalNumberVariable;
inputNumber.onChange = onInputNumberChange;

function onInputNumberChange() {

    var result = parseInt(this.text, 10);
    //var result = parseFloat(this.text);

    // use parseFloat to keep decimals, parseInt for whole numbers.
    // note you should specify the radix for parseInt to ensure it converts to base 10 (decimal).
    // for example, parseInt("012") will assume it's a base 8 value and return 10 (any value with leading zero is assumed to be base 8 if no radix is specified.


    if (isNaN(result) || result < 1 || result > 100) { // if not a number or outside a range you might choose
        this.text = myGlobalNumberVariable; // revert back to the previous setting.
    } else {
        myGlobalNumberVariable = result;
        this.text = result; // set the text box to the result of the parseInt which may be different, for example it will strip any leading zeros or decimals.
    }
}