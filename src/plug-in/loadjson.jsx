//LOAD JSON FILE --- FROM:
//https://github.com/fabianmoronzirfas/extendscript/wiki/Read-In-JSON-From-File-And-DONT-Eval

#include "json2.js" //Library to load JSON file, without using eval function

var userJsonFile = null;

var jsonFile = null; // create an empty variable

function loadJsonRules() {

    //JSON froim user  vs JSON base
    //
    if ((userJsonFile != "") && (userJsonFile != null)) {   //tem ficheiro do user, usa as regras dele
        $.writeln("carrega file do user");
        file_to_read = userJsonFile;
    } else {    //nao tem ficheiro do user, usa regras base
        var script_file = File($.fileName); // get the location of the script file
        var script_file_path = script_file.path; // get the path

        var file_to_read = File(script_file_path + "/rules.json"); // but we want JSON
    }


    var content; // this will hold the String content from the file
    if (file_to_read !== false) { // if it is really there
        file_to_read.open('r'); // open it
        content = file_to_read.read(); // read it
        jsonFile = JSON.parse(content); // now evaluate the string from the file
        file_to_read.close(); // always close files after reading
    } else {
        alert("Error loading rules JSON file");
    }

    // LOAD VARIABLES FROM JSON




    //Generative document Check
    generativeDocument = jsonFile.user.document.generativeDocument;

    //Index
    createIndex = jsonFile.user.document.createIndex;
    createColophon = jsonFile.user.document.createColophon;

    //Page Size
    docWidth = jsonFile.user.page.pageWidth;
    docHeight = jsonFile.user.page.pageHeight;
    generatePageSize = jsonFile.user.page.generatePageSize;

    baseline = jsonFile.user.page.baseline;

    //MASTERS
    choosenMaster = jsonFile.user.masters.choosenMaster;

    //Margins
    generativeMargins = jsonFile.user.margins.generativeMargins;
    topMargin = jsonFile.user.margins.topMargin;
    bottomMargin = jsonFile.user.margins.bottomMargin;
    insideMargin = jsonFile.user.margins.insideMargin;
    outsideMargin = jsonFile.user.margins.outsideMargin;

    //Columns and gutter
    generativeColumns = jsonFile.user.grid.generativeColumns;
    numColumns = jsonFile.user.grid.columns;
    gutterSize = jsonFile.user.grid.gutterSize;
    minGutterSize = jsonFile.user.grid.minGutterSize;
    maxGutterSize = jsonFile.user.grid.maxGutterSize;

    //Characters
    minCharactersLine = jsonFile.rules.charactersByLine.minCharactersLine;
    maxCharactersLine = jsonFile.rules.charactersByLine.maxCharactersLine;

    //Font Size
    minFontSize = jsonFile.rules.fontSize.minFontSize;
    maxFontSize = jsonFile.rules.fontSize.maxFontSize;

    //MIN / MAX margins
    smallSize_width = jsonFile.rules.margins.smallSize.width;
    smallSize_height = jsonFile.rules.margins.smallSize.height;

    //small sizes
    minTopMargin_smallSizes = jsonFile.rules.margins.smallSize.minTopMargin;
    maxTopMargin_smallSizes = jsonFile.rules.margins.smallSize.maxTopMargin;
    minBotttomMargin_smallSizes = jsonFile.rules.margins.smallSize.minBotttomMargin;
    maxBotttomMargin_smallSizes = jsonFile.rules.margins.smallSize.maxBotttomMargin;
    minInsideMargin_smallSizes = jsonFile.rules.margins.smallSize.minInsideMargin;
    maxInsideMargin_smallSizes = jsonFile.rules.margins.smallSize.maxInsideMargin;
    minOutsideMargin_smallSizes = jsonFile.rules.margins.smallSize.minOutsideMargin;
    maxOutsideMargin_smallSizes = jsonFile.rules.margins.smallSize.maxOutsideMargin;

    //big sizes
    minTopMargin_bigSizes = jsonFile.rules.margins.bigSize.minTopMargin;
    maxTopMargin_bigSizes = jsonFile.rules.margins.bigSize.maxTopMargin;
    minBotttomMargin_bigSizes = jsonFile.rules.margins.bigSize.minBotttomMargin;
    maxBotttomMargin_bigSizes = jsonFile.rules.margins.bigSize.maxBotttomMargin;
    minInsideMargin_bigSizes = jsonFile.rules.margins.bigSize.minInsideMargin;
    maxInsideMargin_bigSizes = jsonFile.rules.margins.bigSize.maxInsideMargin;
    minOutsideMargin_bigSizes = jsonFile.rules.margins.bigSize.minOutsideMargin;
    maxOutsideMargin_bigSizes = jsonFile.rules.margins.bigSize.maxOutsideMargin;

    //Columns
    minColumns = jsonFile.rules.columns.minColumns;
    maxColumns = jsonFile.rules.columns.maxColumns;

    //wordDocument analisis
    longDocument_words = jsonFile.rules.wordDocument.longDocument_words;
    image_book_images = jsonFile.rules.wordDocument.image_book_images;


    // checkboces MAP styles
    keepStylesCheckUI = jsonFile.PStyles.checkBoxes.keepStyles;
    mapStylesCheckUI = jsonFile.PStyles.checkBoxes.mapStyles;
    generativeStylesUI = jsonFile.PStyles.checkBoxes.generativeStyles;


    //TAMANHO E RESPETIVO TAMANHO DA FONTE
    pequenos_tam = jsonFile.PStyles.Sizes_and_resopective_FontSizes.pequenos_tam;
    pequenos_fonte_text = jsonFile.PStyles.Sizes_and_resopective_FontSizes.pequenos_fonte_text;
    pequenos_fonte_title = jsonFile.PStyles.Sizes_and_resopective_FontSizes.pequenos_fonte_title;

    medios_tam = jsonFile.PStyles.Sizes_and_resopective_FontSizes.medios_tam;
    medios_fonte_text = jsonFile.PStyles.Sizes_and_resopective_FontSizes.medios_fonte_text;
    medios_fonte_title = jsonFile.PStyles.Sizes_and_resopective_FontSizes.medios_fonte_title;

    grandes_tam = jsonFile.PStyles.Sizes_and_resopective_FontSizes.grandes_tam;
    grandes_fonte_text = jsonFile.PStyles.Sizes_and_resopective_FontSizes.grandes_fonte_text;
    grandes_fonte_title = jsonFile.PStyles.Sizes_and_resopective_FontSizes.grandes_fonte_title;


    //variables to save sizes
    choosenTitleSize = jsonFile.PStyles.chossenSizes.titleSize;
    choosenTextSize = jsonFile.PStyles.chossenSizes.textSize;


    // Treat titles
    //
    treatTitlesGenerative = jsonFile.PStyles.treatTitles.treatTitlesGenerative;
    treatTitlesGenerative_percentage = jsonFile.PStyles.treatTitles.treatTitlesGenerative_percentage;
    newPage = jsonFile.PStyles.treatTitles.newPage;
    columnBreak = jsonFile.PStyles.treatTitles.columnBreak;
    backgroundColor = jsonFile.PStyles.treatTitles.backgroundColor;
    backgroundColor_percentage = jsonFile.PStyles.treatTitles.backgroundColor_percentage;

    //CAPSET
    choosenCapset = jsonFile.user.capset.choosenCapset;


    //TEXT WRAP
    textWrap_value = jsonFile.user.textWrap.textWrap_value;


    //experimental
    //
    //Rectangles
    create_shapes = jsonFile.experimental.shapes.create_shapes;
    shapes_percentage = jsonFile.experimental.shapes.shapes_percentage;

    //Gradients
    create_gradients = jsonFile.experimental.gradients.create_gradients;
    gradients_percentage = jsonFile.experimental.gradients.gradients_percentage;


    interiorMarginGradient = jsonFile.experimental.gradients.interiorMarginGradient;
    exteriorMarginGradient = jsonFile.experimental.gradients.exteriorMarginGradient;
    interiorMarginGradient_percentage = jsonFile.experimental.gradients.interiorMarginGradient_percentage;
    exteriorMarginGradient_percentage = jsonFile.experimental.gradients.exteriorMarginGradient_percentage;

    //Experimental
    randomTextIndent = jsonFile.experimental.textIndent.randomTextIndent;


    createBigCover = jsonFile.experimental.cover.bigCover;

    //--COLORS

    //Light colors
    //
    lightColors = [];

    var number_lightColors = Object.size(jsonFile.rules.colors.lightColors);

    for (var i = 0; i < number_lightColors; i++) {
        //$.writeln(jsonFile.rules.colors.lightColors["c" + i]);
        lightColors.push(jsonFile.rules.colors.lightColors["c" + i]);
    }

    //Dark colors
    //
    var number_darkColors = Object.size(jsonFile.rules.colors.darkColors);
    for (var i = 0; i < number_darkColors; i++) {
        darkColors.push(jsonFile.rules.colors.darkColors["c" + i]);
    }



    //base Sizes
    loadSizes();

    //load ps styles for generative cases
    load_paragraphStyles_knowledge();


    add_images_paragraphStyle();



}





// Base Paragraph styles from JSON
var paragraphStyles = [];

function loadParagraphStylesFromJSONandFontsTab() {

    var usage = [];

    for (var i = 0; i < fontsList.items.length; i++) {
        usage.push(fontsList.items[i].subItems[0].text);
    }


    //get
    var numParagraphStyles = Object.size(jsonFile.paragraphStyles);

    for (var ps = 0; ps < numParagraphStyles; ps++) {

        var setFontAndStyle = true;

        //var newParagraphStyle = myDocument.paragraphStyles.item(jsonFile.paragraphStyles["ps" + ps].psName);
        var newParagraphStyle = app.activeDocument.paragraphStyles.item(jsonFile.paragraphStyles["ps" + ps].psName);

        try {
            var myName = newParagraphStyle.name;
        } catch (myError) {
            //The paragraph style did not exist, so create it.
            //            newParagraphStyle = myDocument.paragraphStyles.add({
            //                name: jsonFile.paragraphStyles["ps" + ps].psName
            //            });

            newParagraphStyle = app.activeDocument.paragraphStyles.add({
                name: jsonFile.paragraphStyles["ps" + ps].psName
            });
        }


        //get the font and style from list
        for (var i = 0; i < usage.length; i++) {
            if (usage[i] == jsonFile.paragraphStyles["ps" + ps].psName) {
                $.writeln("Ha uma fonte para esta usage " + usage[i]);

                //get the font and style from list
                newParagraphStyle.appliedFont = fontsList.items[i].text.split(' - ')[0];
                newParagraphStyle.fontStyle = fontsList.items[i].text.split(' - ')[1];

                // $.writeln("FONT -> " + appliedFontFromList);
                // $.writeln("STYLE -> " + appliedFontStyleFromList);
                var setFontAndStyle = false;
            }
        }

        //Now set the formatting of the paragraph style.

        //se a fonte não foi definida escolhe do JSON
        if (setFontAndStyle) {
            newParagraphStyle.appliedFont = jsonFile.paragraphStyles["ps" + ps].appliedFont;
            newParagraphStyle.fontStyle = jsonFile.paragraphStyles["ps" + ps].fontStyle;
        }

        //fonte random para paragraph style random
        if (jsonFile.paragraphStyles["ps" + ps].psName == "Random") {
            $.writeln("dada");
            //get all fonts
            var allFonts = app.fonts.everyItem().getElements();
            //apply a random font
            newParagraphStyle.appliedFont = allFonts[Math.floor(Math.random() * allFonts.length)];
        }

        newParagraphStyle.pointSize = jsonFile.paragraphStyles["ps" + ps].pointSize;

        //if is not images
        if (jsonFile.paragraphStyles["ps" + ps].psName != "Images") {
            newParagraphStyle.leading = jsonFile.paragraphStyles["ps" + ps].leading;
        }

        //newParagraphStyle.spaceAfter = jsonFile.paragraphStyles["ps" + ps].spaceAfter;
        //newParagraphStyle.spaceBefore = jsonFile.paragraphStyles["ps" + ps].spaceBefore;
        newParagraphStyle.alignToBaseline = jsonFile.paragraphStyles["ps" + ps].alignToBaseline;
        newParagraphStyle.hyphenation = jsonFile.paragraphStyles["ps" + ps].hyphenation;

        switch (jsonFile.paragraphStyles["ps" + ps].justification) {
            case "center":
                newParagraphStyle.justification = Justification.CENTER_ALIGN;
                break;
            case "left":
                newParagraphStyle.justification = Justification.LEFT_ALIGN;
                break;
            case "justified":
                newParagraphStyle.justification = Justification.LEFT_JUSTIFIED;
                break;
        }

        newParagraphStyle.leftIndent = jsonFile.paragraphStyles["ps" + ps].leftIndent;
        newParagraphStyle.firstLineIndent = jsonFile.paragraphStyles["ps" + ps].firstLineIndent;

        paragraphStyles[jsonFile.paragraphStyles["ps" + ps].psName] = newParagraphStyle;
    }


    // TOP — update ps from array
    //paragraphStyles["testa 1"].appliedFont = "Arial";

    //$.writeln(paragraphStyles["testa 1"].appliedFont);
}


//Images paragraph style
function add_images_paragraphStyle() {
    var newParagraphStyle = app.activeDocument.paragraphStyles.item("IMG");

    try {
        var myName = newParagraphStyle.name;
    } catch (myError) {
        //The paragraph style did not exist, so create it.
        //            newParagraphStyle = myDocument.paragraphStyles.add({
        //                name: jsonFile.paragraphStyles["ps" + ps].psName
        //            });

        newParagraphStyle = app.activeDocument.paragraphStyles.add({
            name: "IMG"
        });
    }

    //newParagraphStyle.autoLeading = true;
}


//USER JSON RULES FILE

function importUserJsonRules() {


    $.writeln("teste 1");

    //Display a standard open file dialog box to select a file.
    userJsonFile = File.openDialog("Choose a json file", filterFiles);


    function filterFiles(userJsonFile) {

        var originalName = userJsonFile.name;

        if (userJsonFile.name.match(/\.json$/) || originalName.indexOf('.') == -1) {
            return true;
        } else {
            return false;
        }
    }


    jsonUserPathStatic.text = "Choosen rules file:  " + userJsonFile;


    //If a text file was selected, and if you didn't press Cancel,

    // if ((userJsonFile != "") && (userJsonFile != null)) {
    //     $.writeln("tem ficheiro");
    // } else {
    //     $.writeln("nao tem ficheiro");
    // }
}




//BEST SIZES SYSTEM KNOWLEDGE
function loadSizes() {
    //Small Sizes
    smallSizes_List = [];

    var numOfSizes = Object.size(jsonFile.rules.sizes.smallSizes);
    for (var i = 0; i < numOfSizes; i++) {
        var temp_value = { "w": jsonFile.rules.sizes.smallSizes["size" + i][0], "h": jsonFile.rules.sizes.smallSizes["size" + i][1] };
        smallSizes_List.push(temp_value);
    }


    //Big Sizes
    bigSizes_List = [];

    var numOfSizes = Object.size(jsonFile.rules.sizes.bigSizes);
    for (var i = 0; i < numOfSizes; i++) {
        var temp_value = { "w": jsonFile.rules.sizes.bigSizes["size" + i][0], "h": jsonFile.rules.sizes.bigSizes["size" + i][1] };
        bigSizes_List.push(temp_value);
    }
}



//TAMANHO DO JSON
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};




function load_paragraphStyles_knowledge() {


    // Leitura longaaaaa
    // Leitura longaaaaa

    paragraphStyles_knowledge = [];

    var numOfPS = Object.size(jsonFile.PStyles.styles);


    for (var i = 0; i < numOfPS; i++) {

        var temp_value = {
            "psName": jsonFile.PStyles.styles["style" + i][0],
            "textAppliedFont": jsonFile.PStyles.styles["style" + i][1],
            "textPointSize": jsonFile.PStyles.styles["style" + i][2],
            "textLeading": jsonFile.PStyles.styles["style" + i][3],
            "justification": jsonFile.PStyles.styles["style" + i][4],
            "hyphenation": jsonFile.PStyles.styles["style" + i][5],
            "titleAppliedFont": jsonFile.PStyles.styles["style" + i][7],
            "titlePointSize": jsonFile.PStyles.styles["style" + i][8],
            "titleJustification": jsonFile.PStyles.styles["style" + i][9]
        };

        $.writeln("1" + jsonFile.PStyles.styles["style" + i][9]);


        paragraphStyles_knowledge.push(temp_value);

        //————————————————————————————————————————————————————————————————————————————————————————————————————————————

        // Leitura curtaaaaa
        // Leitura curtaaaaa

        paragraphStyles_knowledge_short = [];

        var numOfPS_short = Object.size(jsonFile.PStyles.styles_short);


        for (var i = 0; i < numOfPS_short; i++) {

            var temp_value_short = {
                "psName": jsonFile.PStyles.styles_short["style" + i][0],
                "textAppliedFont": jsonFile.PStyles.styles_short["style" + i][1],
                "textPointSize": jsonFile.PStyles.styles_short["style" + i][2],
                "textLeading": jsonFile.PStyles.styles_short["style" + i][3],
                "justification": jsonFile.PStyles.styles_short["style" + i][4],
                "hyphenation": jsonFile.PStyles.styles_short["style" + i][5],
                "titleAppliedFont": jsonFile.PStyles.styles_short["style" + i][7],
                "titlePointSize": jsonFile.PStyles.styles_short["style" + i][8],
                "titleJustification": jsonFile.PStyles.styles_short["style" + i][9]
            };

            paragraphStyles_knowledge_short.push(temp_value_short);
        }
    }
}








