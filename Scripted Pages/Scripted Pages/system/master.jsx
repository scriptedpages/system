//#targetengine "session";
#targetengine "InDesign";

#include './loadjson.jsx';

#include './drawUI.jsx';  //draws the user interface

//Get all the inputs from User Interface
#include './getInputsValues.jsx';

#include './createDocument.jsx';  //corre quando se carrega no ok

#include './tratamentoInputs.jsx';

#include './paragraph_styles.jsx';

#include './wordDocument.jsx';

#include './grep.jsx';

#include './images.jsx';

#include './document_functions.jsx';

#include './shapes.jsx';

#include './save_rules.jsx';


//Global Variables

//DOCUMENT TO BE CREATED
//
var myDocument;

var documentLanguage;

//Generative document check
var generativeDocument;

var createIndex,
    createColophon;

//PAGE
//
var docWidth, docHeight, generatePageSize;
var generativeColumns,
    numColumns;

var gutterSize, minGutterSize, maxGutterSize;

//MARGINS
//
var generativeMargins, topMargin, bottomMargin, insideMargin, outsideMargin;
var smallSize_width, smallSize_height; //para ser usado quando as margens são generativas

//Small and big sizes
var minTopMargin_smallSizes,
    maxTopMargin_smallSizes,
    minBotttomMargin_smallSizes,
    maxBotttomMargin_smallSizes,
    minInsideMargin_smallSizes,
    maxInsideMargin_smallSizes,
    minOutsideMargin_smallSizes,
    maxOutsideMargin_smallSizes;

var minTopMargin_bigSizes,
    maxTopMargin_bigSizes,
    minBotttomMargin_bigSizes,
    maxBotttomMargin_bigSizes,
    minInsideMargin_bigSizes,
    maxInsideMargin_bigSizes,
    minOutsideMargin_bigSizes,
    maxOutsideMargin_bigSizes;


//Columns    
var minColumns, maxColumns;


//Word Document analisys
var longDocument_words, //bigger that this is considered a long book
    image_book_images; //more that this number is considered a image book


var document_Words, //number of words on the imported document
    document_Images;    //numbers of imagens on the imported document

//—————TEXT
var baseline;
var minCharactersLine, maxCharactersLine;

var minFontSize, maxFontSize;

//Masters
var choosenMaster;

var number_documentPages;

//TITLE
var treatTitlesGenerative;
var treatTitlesGenerative_percentage;
var newPage;
var columnBreak;
var backgroundColor;
var backgroundColor_percentage;

//CAPSET
var choosenCapset;

//TEXT WRAP
var textWrap_value;


//Shapes
var create_shapes,
    shapes_percentage;

//Gradients
var create_gradients,
    gradients_percentage,
    interiorMarginGradient,
    exteriorMarginGradient,
    interiorMarginGradient_percentage,
    exteriorMarginGradient_percentage;

var randomTextIndent,
    createBigCover;

//Colors
var lightColors = [],
    darkColors = [];

var ChoosenColorForBook;


//PS Styles
var paragraphStyles_knowledge = [],
    paragraphStyles_knowledge_short = [];


var keepStylesCheckUI,
    mapStylesCheckUI,
    generativeStylesUI;

//TAMANHOS E RESPETIVO TAMANHO DA FONTE

var pequenos_tam,
    pequenos_fonte_text,
    pequenos_fonte_title,
    medios_tam,
    medios_fonte_text,
    medios_fonte_title,
    grandes_tam,
    grandes_fonte_text,
    grandes_fonte_title;


var logTab;
var tabPanel;

//Set a default document
var script_file = File($.fileName); // get the location of the script file
var script_file_path = script_file.path; // get the path
var userWordDocument = File(script_file_path + "/The Masque of the Red Death img.docx", undefined, true);

var imagesFolder = null;

var PS_of_Title;
var textParagraphStyle_name;


var choosenTitleSize,
    choosenTextSize;


//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// load basic rules from JSON, max/min font, characters…
loadJsonRules();

// Draws user interface
drawUI();

// Create base document
createBaseDocument();



// var tgt = app.activeDocument.allGraphics;
// for (var i = 1; i < tgt.length; i++) {

//     var bnds = tgt[i].parent.geometricBounds;

//     $.writeln(i + "  ");
//     $.writeln(i + "     " + bnds[0]);
//     $.writeln(i + "     " + bnds[1]);
//     $.writeln(i + "     " + bnds[2]);
//     $.writeln(i + "     " + bnds[3]);
// }



//createColophon_ad();


//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//test fragment of code


//experimental_text_wrap();


function experimental_text_wrap() {

    var allPages = app.activeDocument.pages;

    //Creating the "plain text" object style.  
    // var myPlainTextObjectStyle = myDocument.objectStyles.add();
    // myPlainTextObjectStyle.properties = {
    //     name: "Meu 2",
    //     enableFill: true,
    //     enableStroke: true,
    //     enableStrokeAndCornerOptions: false,
    //     enableTextFrameBaselineOptions: true,
    //     enableTextFrameGeneralOptions: true,
    //     enableTextWrapAndOthers: true,
    //     textWrapPreferences: {
    //         textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
    //         textWrapOffset: [5, 5, 5, 5]
    //     },
    //     textFramePreferences: {
    //         firstBaselineOffset: FirstBaseline.FIXED_HEIGHT,
    //         textColumnCount: 1,
    //         verticalJustification: VerticalJustification.TOP_ALIGN
    //     }
    // }

    var possibleWidths = [100, 50];
    var possibleHeights = [30, 50];
    var possibleAngles = [45, 0, -45];


    var pageWidth = app.activeDocument.documentPreferences.pageWidth;
    var pageHeight = app.activeDocument.documentPreferences.pageHeight;

    //analises the pages from the last to the first one
    for (var pag = 0; pag < allPages.length; pag++) {

        var rectangle = app.activeDocument.pages.item(pag).textFrames.add();

        var randomX = Math.floor(Math.random() * (pageWidth));
        var randomY = Math.floor(Math.random() * (pageHeight));

        rectangle.geometricBounds = [pageWidth, pageWidth + 50, pageHeight, pageHeight + 50]; //top, left, bottom, and right 

        rectangle.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
        rectangle.textWrapPreferences.textWrapOffset = [0, 0, 0, 0];
        rectangle.rotationAngle = 20;


        break;

        //$.writeln("Page " + pageToBeAnalised + "  has  " + allPages[pageToBeAnalised].textFrames.count());

    }

}


// //———— Indice
// //http://www.indiscripts.com/blog/public/data/idcs4-special-characters/en_InDesignCS4-CS5-SpecialChars.pdf#page=2
// app.activeDocument.pages.item(1).textFrames[0].contents = "Teste \u0008 " + "2";

// //———— Indice

//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Fedra Sans Pro\tBold";

//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Fedra Serif B Pro\tBold";
//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Whyte Inktrap\tBold";

//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Antique Olive Std\tBold";
//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Tiempos Text\tRegular";

//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "Euclid Flex\tBold";
//app.activeDocument.pages.item(1).textFrames[0].paragraphs.everyItem().appliedFont = "NEXT\tBold Book";


//coverText_BiggestPossible();


//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

createButton.onClick = function () {

    //TIRAR A SELEÇÃO DEPOIS DO CLIQUE
    createButton.active = true;
    createButton.active = false;

    // // //inicializar progress bar
    // progressBar.visible = true;
    // progressBar.value++;


    $.writeln(" -- ");
    $.writeln("get input values");
    getInputsValues(); //get values from inputs or calculate if is generative
    $.writeln("get input values done  ----------");
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("Map Styles");
    mapAllStyles_allPossibilities();
    $.writeln("Map styles done  ----------");
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("createDocument");
    createDocument(number_documentPages); //Creates the base of the document (spreads, sections, page numbering…)
    $.writeln("Document created  ----------");
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("applyMaster_accordingToMargins");
    applyMaster_accordingToMargins();
    $.writeln("Master applied  ----------");
    $.writeln(" ");


    //progressBar.value++;


    $.writeln(" -- ");
    $.writeln("importWordDocument");
    importWordDocument();    //Import and place word Document
    $.writeln("Document imported  ----------");
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("Apply styles");
    applyPStyles();
    $.writeln("Apply styles Done  ----------");
    $.writeln(" ");


    changeDocumentLanguage();


    //progressBar.value++;


    //images ps
    $.writeln(" -- ");
    $.writeln("add_images_paragraphStyle");
    add_images_paragraphStyle();
    $.writeln("");

    $.writeln(" -- ");
    $.writeln("treat images");
    treat_Images();
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("add_images_paragraphStyle");
    scaleImages_generativeAccordingToColumns(); //image scale
    $.writeln(" ");

    //progressBar.value++;

    // IMAGE WRAP
    //
    $.writeln(" -- ");
    $.writeln("images wrap");
    images_wrap();
    $.writeln(" ");


    //Adicionar dark and light colours
    $.writeln(" -- ");
    $.writeln("Create colours");
    createColours();
    $.writeln(" ");

    create_shapes_gradients_layer();


    //  CREATE COVER
    //
    $.writeln(" -- ");
    $.writeln("Create Cover");
    createCover();
    $.writeln(" ");


    //  TREAT TITLES
    //
    //Ativar isto!!!!
    $.writeln(" -- ");
    $.writeln("Treat titles");
    treat_Titles();
    $.writeln(" ");


    // Correr ou não versões experimentais
    //
    $.writeln(" -- ");
    $.writeln("Experiemental functions");
    run_experimental_functions();
    $.writeln("");



    // CAPTIONS
    $.writeln(" -- ");
    $.writeln("Captions");
    capset();
    $.writeln("");


    //SECTION MARKERS
    $.writeln(" -- ");
    $.writeln("findSectionsMakersWithGREP");
    findSectionsMakersWithGREP(); //GREP
    $.writeln(" ");


    //CLean inicial pages
    $.writeln(" -- ");
    $.writeln("creatBlankMaster_andApply_toTitle");
    creatBlankMaster_andApply_toTitle();
    $.writeln(" ");


    $.writeln(" -- ");
    $.writeln("create index ");
    create_andAd_Index();
    $.writeln(" ");





    $.writeln(" -- ");
    $.writeln("cleanTextFrames_FirstCharacter");
    cleanTextFrames_FirstCharacter();
    $.writeln("  ");

    //REMOVE EMPTY TEXT FRAMES
    $.writeln(" -- ");
    $.writeln("deleteEmptyTextFrames");
    deleteEmptyTextFrames();
    $.writeln(" -- ");
    // AND THEN REMOVES EMPTY PAGES
    deleteEmptyPages();
    $.writeln("delete empty text frames and pages");



    $.writeln(" -- ");
    $.writeln("create colophon ");
    createColophon_ad();
    $.writeln(" -- ");




    $.writeln(" -- ");
    $.writeln("Correct Page num");
    correctPageNum();
    $.writeln(" -- ");



    $.writeln(" -- ");
    $.writeln("Generation Preferences");
    addGenerationPreferences();
    $.writeln(" ");



    //set active page do display the result from top to bottom
    app.activeDocument.layoutWindows[0].activePage = app.activeDocument.pages[0];


    //Define variables to save
    $.writeln("defineVariables_tosave_JSON");
    defineVariables_tosave_JSON();
    $.writeln(" -- ");


    $.writeln(" -enable properties- ");
    logTab.enabled = true;
    tabPanel.selection = logTab;
    $.writeln(" -properties enabled- ");

    appear_createnew_button();

    // $.writeln(" ");
    $.writeln("documento criado");
    $.writeln("↥↥↥↥↥↥↥↥↥↥↥↥↥↥↥");

    progressBar.visible = false;
    progressBar.value = 0;
}




// ——————————————
// ——————————————
// ——————————————


saveSettingsButton.onClick = function () {
    $.writeln("SAVE DOCUMENT CLICK");
    save_rules();
}


importUserJSON_button.onClick = function () {
    importUserJsonRules();
    loadJsonRules();    //atualizar regras
    updateUI();  //updates the values
}


importWordButton.onClick = function () {
    importUserWordDocument();
}


importWordNoImagesButton.onClick = function () {
    importUserWordDocument();
}


importImagesButton.onClick = function () {
    importImagesFolder();
}





//———————————————————— EXPERIMENTAL —————————————————————
//———————————————————————————————————————————————————————
//———————————————————————————————————————————————————————


function run_experimental_functions() {

    if (experimental_backgroundColour.value) {
        createShapes();
    }
    if (experimental_GradientColour.value) {
        create_gradientShapes();
    }

    if (experimental_ParagraphIndents.value) {
        randomTextIndent_andColor();
    }

    if (experimental_BigCover.value) {
        putTextAsBigAsPossible();
    }

}
