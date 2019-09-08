//Get all the input values from the User Interface

function getInputsValues() {

    // Language
    documentLanguage = dropDownLanguage.selection.text;


    //GRID — Page Size, MARGINS, COLUMNS
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    if (generateDocumentCheck.value) {   //vai ser generativo
        $.writeln("************** Vai ser tudo Generativo **************");
        $.writeln("");

        $.writeln("pageSize");
        generative_PageSize();
        $.writeln("");

        $.writeln("margens");
        generative_Margins();
        $.writeln("");

        $.writeln("colunas");
        generative_Columns_and_Gutter();
        $.writeln("");

    } else {

        //SIZE
        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        $.writeln("");
        if (generatePageSizeCheck.value) {   //vai ser generativo
            generative_PageSize();
        } else {
            read_PageSize();
        }


        //MARGINS
        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        $.writeln("");
        if (generativeMarginsCheck.value) { //vai ser generativo
            generative_Margins();
        } else { //vai ler o valor
            read_Margins();
        }


        //COLUMNS
        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        $.writeln("");
        if (generativeColumns_andGutter_Check.value) { //vai ser generativo
            generative_Columns_and_Gutter();
            $.writeln("colunas generativas");
        } else { //vai ler o valor
            read_Columns_and_gutter();
            $.writeln("colunas leitura");
        }

    }
}










//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

//Page size
function read_PageSize() {
    docWidth = parseInt(widthValueField.text);
    docHeight = parseInt(heightValueField.text);
}

// Generative page size
function generative_PageSize() {

    $.writeln(document_Images + " document_Images");
    $.writeln(image_book_images + " image_book_images");

    //Se o documento for pequeno
    if (document_Images < image_book_images) {  //Small sizes — no images
        $.writeln("Generative page size para POUCAS imagens");

        randomSize = Math.floor(Math.random() * (smallSizes_List.length));

        docWidth = smallSizes_List[randomSize].w;
        docHeight = smallSizes_List[randomSize].h;
        $.writeln(docWidth + " docWidth");
        $.writeln(docHeight + " docHeight");
    } else {  //Big Sizes - Images
        $.writeln("Generative page size para MUITAS imagens");
        randomSize = Math.floor(Math.random() * (bigSizes_List.length));

        docWidth = bigSizes_List[randomSize].w;
        docHeight = bigSizes_List[randomSize].h;
    }

}

//———————————————————————————————————————————————————————————————————————————————————

// Columns
function generative_Columns_and_Gutter() {
    var utilPageWidth = docWidth - insideMargin - outsideMargin;
    $.writeln("utilPageWidth " + utilPageWidth);
    $.writeln("minColumns " + minColumns);
    $.writeln("maxColumns " + maxColumns);

    var numMax_ColumnsPossible = Math.floor(utilPageWidth / minColumns);
    var numMin_ColumnsPossible = Math.floor(utilPageWidth / maxColumns);

    $.writeln("MIN POSSIVEL COLUNAS " + numMin_ColumnsPossible);
    $.writeln("MAX POSSIVEL COLUNAS " + numMax_ColumnsPossible);

    var calculateNumberOfColumns = Math.floor(Math.random() * (numMax_ColumnsPossible - numMin_ColumnsPossible + 1)) + numMin_ColumnsPossible;

    if (calculateNumberOfColumns == 0) {
        calculateNumberOfColumns = 1;
    }

    $.writeln("COLUNAS =  " + calculateNumberOfColumns);
    numColumns = calculateNumberOfColumns;

    gutterSize = Math.floor(Math.random() * (maxGutterSize - minGutterSize + 1)) + minGutterSize;
}

function read_Columns_and_gutter() {
    numColumns = parseInt(columnsText.text);

    gutterSize = parseInt(gutterValueField.text);
}

//———————————————————————————————————————————————————————————————————————————————————

//Margins
function generative_Margins() {
    $.writeln("margens generativas");

    //Generative for small sizes
    if (docWidth <= smallSize_width) {
        $.writeln("Margens calculadas para tamanhos PEQUENOS");
        // Returns a random integer between min (include) and max (include)
        topMargin = Math.floor(Math.random() * (maxTopMargin_smallSizes - minTopMargin_smallSizes + 1)) + minTopMargin_smallSizes;
        bottomMargin = Math.floor(Math.random() * (maxBotttomMargin_smallSizes - minBotttomMargin_smallSizes + 1)) + minBotttomMargin_smallSizes;
        insideMargin = Math.floor(Math.random() * (maxInsideMargin_smallSizes - minInsideMargin_smallSizes + 1)) + minInsideMargin_smallSizes;
        outsideMargin = Math.floor(Math.random() * (maxInsideMargin_smallSizes - minOutsideMargin_smallSizes + 1)) + minOutsideMargin_smallSizes;

        //dar o valor da max margem de acordo com o size
        minInsideMargin = minInsideMargin_smallSizes;
        maxInsideMargin = maxInsideMargin_smallSizes;
        minOutsideMargin = minOutsideMargin_smallSizes;
        maxOutsideMargin = maxOutsideMargin_smallSizes;
    } else { //Generative for big sizes
        $.writeln("Margens calculadas para tamanhos GRANDES");
        topMargin = Math.floor(Math.random() * (maxTopMargin_bigSizes - minTopMargin_bigSizes + 1)) + minTopMargin_bigSizes;
        bottomMargin = Math.floor(Math.random() * (maxBotttomMargin_bigSizes - minBotttomMargin_bigSizes + 1)) + minBotttomMargin_bigSizes;
        insideMargin = Math.floor(Math.random() * (maxInsideMargin_bigSizes - minInsideMargin_bigSizes + 1)) + minInsideMargin_bigSizes;
        outsideMargin = Math.floor(Math.random() * (maxOutsideMargin_bigSizes - minOutsideMargin_bigSizes + 1)) + minOutsideMargin_bigSizes;

        //dar o valor da max margem de acordo com o size
        minInsideMargin = minInsideMargin_bigSizes;
        maxInsideMargin = maxInsideMargin_bigSizes;
        minOutsideMargin = minOutsideMargin_bigSizes;
        maxOutsideMargin = maxOutsideMargin_bigSizes;
    }

    $.writeln(topMargin + " top");
    $.writeln(bottomMargin + " bottom");
    $.writeln(insideMargin + " inside");
    $.writeln(outsideMargin + " outside");
}

function read_Margins() {
    $.writeln("le o valor margens");
    topMargin = parseInt(topMarginValueField.text);
    bottomMargin = parseInt(bottomMarginValueField.text);
    insideMargin = parseInt(insideMarginValueField.text);
    outsideMargin = parseInt(outsideMarginValueField.text);

    $.writeln(topMargin + " top");
    $.writeln(bottomMargin + " bottom");
    $.writeln(insideMargin + " inside");
    $.writeln(outsideMargin + " outside");
}
