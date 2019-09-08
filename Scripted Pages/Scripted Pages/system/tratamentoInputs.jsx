function onInputNumberChange() {

    var result = parseInt(this.text, 10);
    var result = this.text;

    var value = result.replace(/\D/g, '');
    var units = result.replace(/[0-9]/g, '').replace(/\s/g, ''); //get units removing all the numbers and white spaces

    $.writeln("result   " + result);
    //$.writeln("units   " + units + "   " + typeof(units));


    switch (units) {
        case "mm":
            //$.writeln("unidade é em mm");
            break;
        case "pt":
            this.text = ((value * 0.352777778).toFixed(2)) + " mm"; //round to 2 decimal places
            break;
        default:
            this.text = value + " mm";
    }
}
