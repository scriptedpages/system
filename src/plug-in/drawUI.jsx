//Get all the inputs from User Interface
//#include './getInputsValues.jsx';
var createButton,
    saveSettingsButton,
    importUserJSON_button,
    importWordButton,
    importWordNoImagesButton,
    importImagesButton,
    createOtherButton;

var myButtonGroup;

var importOnlyWordCheck,
    importWordImagesCheck;

//UI
var PageSizePnl, dropdownPageSizes, marginsPanel, columnsGutterPanel;
var widthStatic, heightStatic;

var columnsText;
var gutterStatic;

//FONTS
var fontsList;

var columnsStaticText;
var dropDownLanguage;

//DIMENSIONS
var widthValueField, heightValueField;

//GUTTER
var gutterValueField;

//MARGINS
var topMarginValueField, bottomMarginValueField, insideMarginValueField, outsideMarginValueField;
var topStatic, bottomStatic, insideStatic, outsideStatic;


//MAP STYLES
var mapPanel, staticMapStyles, keepStylesStatic, generativeStylesStatic;


// Check boxes
var generatePageSizeCheck,
    generativeMarginsCheck,
    generativeColumns_andGutter_Check,
    generateDocumentCheck,
    createIndex_Check,
    createColophon_Check;

var numCharacters = 10; //used to define edit text size

var saveRulesFileField;
var savedStatic;


//UI base values
var minUiMargin = 3;
var buttonHeight = 20;
var buttonWidth = 120;

//PROGRESS BAR
var progressBar;

//Map styles
var mapStylesTab,
    mapPSList,
    wordStyles_Dropdown;

var keepStylesCheck,
    generativeStylesCheck,
    mapStylesCheck;


var wordDocumentPathStatic,
    wordDocumentPathStatic2,
    jsonUserPathStatic,
    wordImagesPathStatic;


// Experimental

var experimental_backgroundColour, experimental_GradientColour, experimental_ParagraphIndents, experimental_BigCover;




function drawUI() {

    // Create window
    var w = new Window('palette', "Scripted Pages");
    w.margins = [3, 3, 2, 10];
    w.spacing = 0;
    w.size = [450, 540];

    //Create tabbedPanel
    tabPanel = w.add('tabbedpanel');
    tabPanel.margins = [0, 0, 0, 0];
    tabPanel.alignment = 'fill';

    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ DOCUMENT TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    var documentTab = tabPanel.add('tab', undefined, "Document")
    documentTab.margins = [10, 15, 0, 0];

    //︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾ PAGE SIZE ︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾
    //︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾
    var generativeDocument_group = documentTab.add("group");
    generativeDocument_group.alignment = 'left';
    generativeDocument_group.margins = [10, 0, 0, 10];
    generateDocumentCheck = generativeDocument_group.add("checkbox", undefined, "Automatic Document Properties");
    generateDocumentCheck.value = generativeDocument;


    generateDocumentCheck.onClick = function () {
        generateDocumentCheck_updateCorrespondingUI();
    }


    ////////
    var stack = documentTab.add('group');
    stack.alignment = ["fill", "fill"];
    stack.orientation = 'stack';

    PageSizePnl = stack.add('panel', undefined, 'Page Size:                                  ');
    PageSizePnl.alignment = ["fill", "fill"];
    PageSizePnl.alignChildren = ['left', 'top'];

    dropdownPageSizes = stack.add("group").add("dropdownlist", undefined, ['Custom', 'A4', 'A5', '105 × 180 mm', '110 × 170 mm', '150 × 210 mm', '170 × 240 mm', '180 × 180 mm']);
    dropdownPageSizes.selection = 0;
    dropdownPageSizes.parent.alignment = ['left', 'top'];
    dropdownPageSizes.parent.margins = [80, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    //space
    var white_space2 = PageSizePnl.add("statictext", undefined, "");
    white_space2.preferredSize.height = 1;

    //GRUPO GERAL PARA FAZER O ALINHAMENTO
    var pageSizeGroup = PageSizePnl.add("group");
    pageSizeGroup.margins = [0, 12, 0, 0]
    pageSizeGroup.alignment = "center";

    //GRUPO DO TEXTO DAS MARGENS TOP E BOTTOM
    var widthGroup = pageSizeGroup.add("group");
    widthGroup.orientation = "row";


    widthStatic = widthGroup.add("statictext", undefined, "Width:");
    widthStatic.alignment = "right";
    widthValueField = widthGroup.add("edittext", undefined, docWidth);
    widthValueField.alignment = "right";


    //GRUPO DO TEXTO DAS MARGENS TOP E BOTTOM
    var heightGroup = pageSizeGroup.add("group");
    heightGroup.orientation = "row";

    heightStatic = heightGroup.add("statictext", undefined, "Height:");
    heightStatic.alignment = "right";
    heightValueField = heightGroup.add("edittext", undefined, docHeight);
    heightValueField.alignment = "left";

    widthValueField.characters = numCharacters;
    heightValueField.characters = numCharacters;

    //Generative page size
    generatePageSizeCheck = PageSizePnl.add("checkbox", undefined, "Automatic Page Size");
    generatePageSizeCheck.alignment = 'left';
    generatePageSizeCheck.value = generatePageSize;


    generatePageSizeCheck.onClick = function () {
        generatePageSizeCheck_updateCorrespondingUI();
    }



    //Treat Page Size Dropdown
    dropdownPageSizes.onChange = function () {
        var dropdownPageSizes_text = dropdownPageSizes.selection.text;
        switch (dropdownPageSizes_text) {
            case "A5":
                widthValueField.text = "148 mm";
                heightValueField.text = "210 mm";
                break;
            case "A4":
                widthValueField.text = "210 mm";
                heightValueField.text = "297 mm";
                break;
            case "Custom":
                break;
            default:
                dropdownPageSizes_text = dropdownPageSizes_text.replace(/\s/g, ""); //remove white spaces
                dropdownPageSizes_text = dropdownPageSizes_text.substring(0, dropdownPageSizes_text.length - 2); //remove word "mm"
                widthValueField.text = dropdownPageSizes_text.split('×')[0] + " mm";
                heightValueField.text = dropdownPageSizes_text.split('×')[1] + " mm";
        }
    }

    //When changes size, dropdown changes to [custom size]
    widthValueField.onChanging = function () {
        dropdownPageSizes.selection = 0;
    }

    heightValueField.onChanging = function () {
        dropdownPageSizes.selection = 0;
    }


    //︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾ MARGINS ︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾
    //︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾

    marginsPanel = documentTab.add('panel', undefined, 'Margins');
    marginsPanel.alignment = 'fill';


    //GRUPO GERAL PARA FAZER O ALINHAMENTO
    var marginsGroup = marginsPanel.add("group");

    //GRUPO DO TEXTO DAS MARGENS TOP E BOTTOM
    var topBottomGroup = marginsGroup.add("group");
    topBottomGroup.orientation = "column";


    topStatic = topBottomGroup.add("statictext", undefined, "Top:");
    bottomStatic = topBottomGroup.add("statictext", undefined, "Bottom:");
    topStatic.alignment = "right";
    bottomStatic.alignment = "right";

    //GRUPO DOS VALORES DAS MARGENS TOP E BOTTOM
    var topBottomValueGroup = marginsGroup.add("group");
    topBottomValueGroup.orientation = "column";

    topMarginValueField = topBottomValueGroup.add("edittext", undefined, topMargin);
    bottomMarginValueField = topBottomValueGroup.add("edittext", undefined, bottomMargin);
    topMarginValueField.characters = numCharacters;
    bottomMarginValueField.characters = numCharacters;


    //GRUPO DO TEXTO DAS MARGENS INSIDE E OUSIDE
    var insideOutsideGroup = marginsGroup.add("group");
    insideOutsideGroup.orientation = "column";

    insideStatic = insideOutsideGroup.add("statictext", undefined, "Inside:");
    outsideStatic = insideOutsideGroup.add("statictext", undefined, "Outside:");
    insideStatic.alignment = "right";
    outsideStatic.alignment = "right";

    //GRUPO DOS VALORES DAS MARGENS INSIDE E OUSIDE
    var insideOutsideValueGroup = marginsGroup.add("group");
    insideOutsideValueGroup.orientation = "column";

    insideMarginValueField = insideOutsideValueGroup.add("edittext", undefined, insideMargin);
    outsideMarginValueField = insideOutsideValueGroup.add("edittext", undefined, outsideMargin);
    insideMarginValueField.characters = numCharacters;
    outsideMarginValueField.characters = numCharacters;

    //—————————— Check Generative margins ▢   --- tratamento feito em baixo no comentário CHECK BOXES
    generativeMarginsCheck = marginsPanel.add("checkbox", undefined, "Automatic Margins");
    generativeMarginsCheck.alignment = 'left';
    generativeMarginsCheck.value = generativeMargins;


    ////////////////////////  COLUMNS AND GUTTER  ////////////////////////
    //////////////////////////////////////////////////////////////////////

    columnsGutterPanel = documentTab.add('panel', undefined, 'Columns and Gutter');

    columnsGutterPanel.alignment = 'fill';

    //GRUPO GERAL
    var columnsGutterGroup = columnsGutterPanel.add("group");
    columnsGutterGroup.alignment = 'center';

    columnsGutterGroup.margins = [0, 10, 0, 0];

    // ----- COLUNAS
    var columnsGroup = columnsGutterGroup.add("group", undefined, "groupOne");

    columnsStaticText = columnsGroup.add("statictext", undefined, "Columns:");
    columnsText = columnsGroup.add("edittext", undefined, numColumns);
    //columnsText.size = [50, 23];
    columnsText.characters = numCharacters;

    //Check ▢
    generativeColumns_andGutter_Check = columnsGutterPanel.add("checkbox", undefined, "Automatic Columns and Gutter");
    generativeColumns_andGutter_Check.alignment = 'left';
    generativeColumns_andGutter_Check.value = generativeColumns;


    //Columns
    generativeColumns_andGutter_Check.onClick = function () {
        generativeColumnsandGutterCheck_updateCorrespondingUI();
    }


    //GUTTER
    var gutterGroup = columnsGutterGroup.add("group");
    gutterGroup.margins = [10, 0, 0, 0];
    gutterGroup.orientation = "row";

    gutterStatic = gutterGroup.add("statictext", undefined, "Gutter:");
    gutterValueField = gutterGroup.add("edittext", undefined, gutterSize);
    gutterValueField.characters = numCharacters;


    //var myGlobalNumberVariable = 1;
    //gutterValueField.text = myGlobalNumberVariable;
    gutterValueField.onChange = onInputNumberChange; //check input (numbers and units (mm, cm, pt…))


    jsonUserPathStatic = documentTab.add("statictext", undefined, "");
    jsonUserPathStatic.alignment = 'fill';

    importUserJSON_button = documentTab.add("button", undefined, "Import Document Properties", { name: "Import" });
    importUserJSON_button.size = [buttonWidth + 80, buttonHeight];

    white_space = documentTab.add("statictext", undefined, "");
    white_space.preferredSize.height = 1;

    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ INPUT DOCUMENT TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    var inputDocument = tabPanel.add('tab', undefined, "Input");
    inputDocument.margins = [10, 15, 0, 0];


    //ONLY WORD DOCUMENT
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var stackInput = inputDocument.add('group');
    stackInput.orientation = 'stack';
    stackInput.size = [425, 75];
    stackInput.alignment = "left";
    stackInput.margins = 0;

    var wordInputPnl = stackInput.add('panel', undefined, '                                         ');
    wordInputPnl.alignment = "fill";
    wordInputPnl.alignChildren = ['left', 'top'];

    //Stack
    var staticWord = stackInput.add("group").add("statictext", undefined, "Import Word Document");
    staticWord.parent.alignment = ['left', 'top'];
    staticWord.parent.margins = [30, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    importOnlyWordCheck = stackInput.add("group").add("checkbox", undefined, " ");
    importOnlyWordCheck.parent.alignment = ['left', 'top'];
    importOnlyWordCheck.parent.margins = [10, 1, 0, 0]; // Allows to left-indent the dropdown as desired 
    importOnlyWordCheck.value = 1;


    //WORD IMPORT
    //word file path
    wordDocumentPathStatic = wordInputPnl.add("statictext", undefined, "");
    wordDocumentPathStatic.alignment = 'fill';

    importWordButton = wordInputPnl.add("button", undefined, "Choose word document");
    importWordButton.size = [buttonWidth + 40, buttonHeight];
    importWordButton.alignment = 'center';


    //WORD DOCUMENT + IMAGES FOLDER
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var stackInputImages = inputDocument.add('group');
    stackInputImages.orientation = 'stack';
    stackInputImages.size = [425, 135];
    stackInputImages.alignment = "left";
    stackInputImages.margins = 0;

    var wordImagesInputPnl = stackInputImages.add('panel', undefined, '                                                                   ');
    wordImagesInputPnl.alignment = "fill";
    wordImagesInputPnl.alignChildren = ['left', 'top'];

    //Stack
    var staticWordImages = stackInputImages.add("group").add("statictext", undefined, "Import Word Document + Images Folder");
    staticWordImages.parent.alignment = ['left', 'top'];
    staticWordImages.parent.margins = [30, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    importWordImagesCheck = stackInputImages.add("group").add("checkbox", undefined, " ");
    importWordImagesCheck.parent.alignment = ['left', 'top'];
    importWordImagesCheck.parent.margins = [10, 1, 0, 0]; // Allows to left-indent the dropdown as desired 


    //WORD IMPORT ///////////////////////////////
    //word file path
    wordDocumentPathStatic2 = wordImagesInputPnl.add("statictext", undefined, "");
    wordDocumentPathStatic2.alignment = 'fill';

    importWordNoImagesButton = wordImagesInputPnl.add("button", undefined, "Choose Word document");
    importWordNoImagesButton.size = [buttonWidth + 40, buttonHeight];
    importWordNoImagesButton.alignment = 'center';


    //IMAGES IMPORT
    wordImagesPathStatic = wordImagesInputPnl.add("statictext", undefined, "");
    wordImagesPathStatic.alignment = 'fill';

    importImagesButton = wordImagesInputPnl.add("button", undefined, "Choose Images Folder");
    importImagesButton.size = [buttonWidth + 40, buttonHeight];
    importImagesButton.alignment = 'center';


    //Disable word + document input
    wordImagesInputPnl.enabled = false;
    staticWordImages.enabled = false;
    importWordImagesCheck.value = 0;


    //Checkboxes input
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    importOnlyWordCheck.onClick = function () {
        if (importOnlyWordCheck.value) { //Se check = true, desativa os inputs
            wordInputPnl.enabled = true;
            staticWord.enabled = true;

            //Disable others
            wordImagesInputPnl.enabled = false;
            staticWordImages.enabled = false;
            importWordImagesCheck.value = 0;
        } else {
            wordInputPnl.enabled = false;
            staticWord.enabled = false;
            //
            wordImagesInputPnl.enabled = true;
            staticWordImages.enabled = true;
            importWordImagesCheck.value = 1;
        }
    }


    importWordImagesCheck.onClick = function () {
        if (importWordImagesCheck.value) { //Se check = true, desativa os inputs
            wordImagesInputPnl.enabled = true;
            staticWordImages.enabled = true;

            //Disable others
            wordInputPnl.enabled = false;
            staticWord.enabled = false;
            importOnlyWordCheck.value = 0;

        } else {
            wordImagesInputPnl.enabled = false;
            staticWordImages.enabled = false;
            //
            wordInputPnl.enabled = true;
            staticWord.enabled = true;
            importOnlyWordCheck.value = 1;
        }
    }



    var white_space = inputDocument.add("statictext", undefined, "");
    white_space.preferredSize.height = 20;


    var indexColophonPnl = inputDocument.add('panel', undefined, 'Choose document properties');
    indexColophonPnl.alignment = "fill";
    indexColophonPnl.margins = [10, 30, 10, 10];
    indexColophonPnl.alignChildren = ['left', 'top'];


    //INDEX
    // // // // // // // // // // // // // // // // // // // // // // // //

    var creat_indexGroup = indexColophonPnl.add("group");
    //creat_indexGroup.margins = [10, 10, 10, 10];
    creat_indexGroup.alignment = "left";

    createIndex_Check = creat_indexGroup.add("checkbox", undefined, "Create Index");
    //createIndex_Check.alignment = "left";
    createIndex_Check.value = createIndex;

    //Colophon
    // // // // // // // // // // // // // // // // // // // // // // // //

    var creat_colophonGroup = indexColophonPnl.add("group");
    //creat_colophonGroup.margins = [10, 10, 10, 10];
    creat_colophonGroup.alignment = "left";

    createColophon_Check = creat_colophonGroup.add("checkbox", undefined, "Create Colophon");
    //createIndex_Check.alignment = "left";
    createColophon_Check.value = createColophon;


    // var separatorPanel = inputDocument.add('panel');

    // separatorPanel.preferredSize.width = 430;
    // separatorPanel.preferredSize.height = 1;


    // Language
    // // // // // // // // // // // // // // // // // // // // // // // //
    var languageGroup = inputDocument.add("group");
    languageGroup.orientation = "row";
    languageGroup.margins = [10, 10, 0, 0];
    languageGroup.alignment = "left";

    var languageStatic = languageGroup.add("statictext", undefined, "Document Language:");
    dropDownLanguage = languageGroup.add("dropdownlist", undefined, ['Portuguese: Orthographic Agreement', 'English: UK']);
    dropDownLanguage.selection = 0;



    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ FONTS TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    /////////////////  GET APP AND DOCUMENT FONTS  /////////////////////
    ////////////////////////////////////////////////////////////////////


    // var allFonts = app.fonts.everyItem().getElements();
    // var fontNamesList = ["All fonts"];

    // for (var i = 0; i < allFonts.length; i++) {
    //     fontNamesList.push(allFonts[i].name.replace(/\t/, " - "));
    // }

    // //////////////////////////////////////////////////////////////////////

    // var fontsTab = tabPanel.add('tab', undefined, "Fonts");
    // fontsTab.margins = [10, 15, 0, 0];

    // /////////////////////////////  DROPDOWN FONTS  ///////////////////////
    // //////////////////////////////////////////////////////////////////////

    // var fontsPanel = fontsTab.add('panel', undefined, 'System Fonts');
    // fontsPanel.alignment = 'fill';

    // var fontStatic = fontsPanel.add("statictext", undefined, "Font");
    // fontStatic.alignment = 'left';

    // var fontsDropdown = fontsPanel.add("dropdownlist", undefined, fontNamesList);
    // fontsDropdown.margins = [minUiMargin, 10, minUiMargin, minUiMargin];
    // fontsDropdown.selection = 0;

    // /////////////////////////////  DROPDOWN USAGE  ///////////////////////
    // //////////////////////////////////////////////////////////////////////

    // var fontUsage = ["Title PS", "Subtitle PS", "Body text PS", "Sections PS", "Random"];

    // var fontUsageStatic = fontsPanel.add("statictext", undefined, "Font Usage");
    // fontUsageStatic.alignment = 'left';

    // var usageFontPanel = fontsPanel.add("dropdownlist", undefined, fontUsage);
    // usageFontPanel.margins = [minUiMargin, 10, minUiMargin, minUiMargin];
    // usageFontPanel.alignment = 'fill';
    // usageFontPanel.selection = 0;


    // // List of choose fonts
    // fontsList = fontsPanel.add("listbox", undefined, undefined, {
    //     numberOfColumns: 2,
    //     showHeaders: true,
    //     columnTitles: ["Font                                    ", "Usage    "],
    //     multiselect: true
    //     //columnWidths: [350, 50, 200, 100]
    // });
    // fontsList.alignment = ["fill", "fill"];
    // fontsList.preferredSize.height = 125;
    // //    list.preferredSize.width = 400;


    // var listButtonsGroup = fontsPanel.add("group", undefined, "listButtonsGroup");
    // //listButtonsGroup.alignment = "left";
    // listButtonsGroup.orientation = "row";

    // var addCombinationButton = listButtonsGroup.add("button", undefined, "Add");
    // var removeCombinationButton = listButtonsGroup.add("button", undefined, "Remove Selected");

    // //Treat sleect fonts
    // //Add selected fonts ——————————————————————————————————————————————————
    // addCombinationButton.onClick = function () {
    //     var choosenFont = fontsDropdown.selection.text;
    //     var choosenUsage = usageFontPanel.selection.text;

    //     var choosenFontIndex = fontsDropdown.selection.index;

    //     //check if usage already exists part         
    //     for (var i = 0; i < fontsList.items.length; i++) {
    //         //tempUsage.push(fontsList.items[i].subItems[0].text);

    //         if (fontsList.items[i].subItems[0].text === choosenUsage) {
    //             $.writeln("usage already exists");
    //             fontsList.remove(fontsList.items[i]);
    //         }
    //     }

    //     //if (fontsList.find(choosenFont) == null && choosenFontIndex != 0) { // dont add repeated nor the 1st "All fonts"
    //     if (choosenFontIndex != 0) { //add new item if 
    //         var lItem = fontsList.add("item", choosenFont).subItems[0].text = choosenUsage;
    //     }
    // }


    // //Remove selected fonts ——————————————————————————————————————————————————
    // removeCombinationButton.onClick = function () {
    //     var choosenFont = fontsDropdown.selection.text;
    //     var choosenUsage = usageFontPanel.selection.text;

    //     var choosenFontIndex = fontsDropdown.selection.index;


    //     for (var i = fontsList.selection.length - 1; i > -1; i--)
    //         fontsList.remove(fontsList.selection[i]);
    // }



    // ///////////////////  CHOOSE FONTS FOLDER  //////////////////////////

    // // var chooseFontsFonderButton = fontsPanel.add("button", undefined, "Choose a Folder", {
    // //     name: "ok"
    // // });

    // // chooseFontsFonderButton.onClick = function () {
    // //     var FontsFolder = Folder.selectDialog("Choose a Folder");
    // //     var FontsFolderFiles = FontsFolder.getFiles();

    // //     //$.writeln(FontsFolder);
    // //     //$.writeln(FontsFolderFiles);

    // //     //fontsFolder = SelectFolder(this, "Pick a folder with fonts installed.");
    // // }


    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ MAP STYLES TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    //colapse panel
    //mapPanel.size = [40, 15];

    ////////////////////////

    mapStylesTab = tabPanel.add('tab', undefined, "Styles");
    mapStylesTab.margins = [10, 15, 0, 0];


    /////////////////////////////////// Keep word Styles ////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    var stackKeepStyles = mapStylesTab.add('group');
    stackKeepStyles.orientation = 'stack';
    stackKeepStyles.alignment = "left";

    //Stack
    keepStylesStatic = stackKeepStyles.add("group").add("statictext", undefined, "Keep Styles");
    keepStylesStatic.parent.alignment = ['left', 'top'];
    keepStylesStatic.parent.margins = [30, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    keepStylesCheck = stackKeepStyles.add("group").add("checkbox", undefined, " ");
    keepStylesCheck.parent.alignment = ['left', 'top'];
    keepStylesCheck.parent.margins = [10, 1, 0, 0]; // Allows to left-indent the dropdown as desired 

    //atribute inicial value
    keepStylesCheck.value = keepStylesCheckUI;


    /////////////////////////////////// Map styles //////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    var stackMapStyles = mapStylesTab.add('group');
    stackMapStyles.orientation = 'stack';
    stackMapStyles.size = [425, 325];
    //stackInput.alignment = ["fill", "fill"];
    stackMapStyles.margins = 0;


    mapPanel = stackMapStyles.add('panel', undefined, '                     ');
    mapPanel.alignment = "fill";
    //mapPanel.alignChildren = "['left', 'top']";
    mapPanel.alignChildren = "center";


    //Stack
    staticMapStyles = stackMapStyles.add("group").add("statictext", undefined, "Map Styles");
    staticMapStyles.parent.alignment = ['left', 'top'];
    staticMapStyles.parent.margins = [30, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    mapStylesCheck = stackMapStyles.add("group").add("checkbox", undefined, " ");
    mapStylesCheck.parent.alignment = ['left', 'top'];
    mapStylesCheck.parent.margins = [10, 1, 0, 0]; // Allows to left-indent the dropdown as desired 

    //atribute inicial value
    mapStylesCheck.value = mapStylesCheckUI;


    /////////////////////////////  DROPDOWN WORD STYLEs  ///////////////////////
    //////////////////////////////////////////////////////////////////////

    // var mapPanel = mapStylesTab.add('panel', undefined, ' Map Styles ');
    // mapPanel.alignment = 'fill';


    //word
    var white_space = mapPanel.add("statictext", undefined, "");
    white_space.preferredSize.height = 3;

    //word
    var wordStatic = mapPanel.add("statictext", undefined, "Word Styles");
    wordStatic.alignment = 'left';
    //wordStatic.preferredSize.height = 20;


    // var allParaStyles = app.activeDocument.allParagraphStyles;
    // var PSNames = [];
    // for (var i = 0; i < allParaStyles.length; i++) {
    //     if (i > 1) {
    //         var curStyle = allParaStyles[i];

    //         PSNames.push(allParaStyles[i].name);
    //     }
    // }

    wordStyles_Dropdown = mapPanel.add("dropdownlist", undefined, undefined); //valores começam iundefined e atribuo valores ao importar word
    wordStyles_Dropdown.alignment = 'fill';
    wordStyles_Dropdown.margins = [minUiMargin, 10, minUiMargin, minUiMargin];
    //    wordStyles_Dropdown.selection = 0;


    //indesign
    //
    //Get all system fonts
    var systemFonts = app.fonts.everyItem().getElements();
    //var systemFontNamesList = ["New Paragraph Style", "Random", "-"];
    var systemFontNamesList = ["Random", "-"];

    for (var i = 0; i < systemFonts.length; i++) {
        systemFontNamesList.push(systemFonts[i].name.replace(/\t/, " - "));
    }

    var inDesignStatic = mapPanel.add("statictext", undefined, "Choose new font for InDesign Style");
    inDesignStatic.alignment = 'left';

    var inDesignStyles_Dropdown = mapPanel.add("dropdownlist", undefined, systemFontNamesList);
    inDesignStyles_Dropdown.alignment = 'fill';
    inDesignStyles_Dropdown.margins = [minUiMargin, 10, minUiMargin, minUiMargin];
    inDesignStyles_Dropdown.selection = 0;

    ///inDesignStyles_Dropdown.add("separator", undefined, 1)
    //inDesignStyles_Dropdown.items[1].enabled = false;



    // —————— Word —————— Indesign ——————
    // |              |                 |
    // |              |                 |
    // |              |                 |
    // ——————————————————————————————————

    // List of mapped styles
    //
    mapPSList = mapPanel.add("listbox", undefined, undefined, {
        numberOfColumns: 2,
        showHeaders: true,
        columnTitles: ["Word Style                                    ", "InDesign style    "],
        multiselect: true
        //columnWidths: [350, 50, 200, 100]
    });
    mapPSList.alignment = ["fill", "fill"];
    mapPSList.preferredSize.height = 125;
    //mapList.preferredSize.width = 400;


    //Treat MAP
    var maplistButtonsGroup = mapPanel.add("group", undefined, "listButtonsGroup");
    maplistButtonsGroup.orientation = "row";


    var removeMappingButton = maplistButtonsGroup.add("button", undefined, "Remove Selected");
    removeMappingButton.size = [buttonWidth, buttonHeight];
    var addMappingButton = maplistButtonsGroup.add("button", undefined, "Add");
    addMappingButton.size = [buttonWidth, buttonHeight];


    //Add selected fonts ——————————————————————————————————————————————————
    addMappingButton.onClick = function () {

        var choosenWordStyle = wordStyles_Dropdown.selection.text;
        var choosenIndesignStyle = inDesignStyles_Dropdown.selection.text;

        var choosenWordStyleIndex = wordStyles_Dropdown.selection.index;

        //check if usage already exists part         
        for (var i = 0; i < mapPSList.items.length; i++) {
            //if (mapPSList.items[i].subItems[0].text === choosenIndesignStyle) {
            if (mapPSList.items[i].text === choosenWordStyle) {
                $.writeln("usage already exists");
                mapPSList.remove(mapPSList.items[i]);
            }
        }

        //if (maplistButtonsGroup.find(choosenFont) == null && choosenWordStyleIndex != 0) { // dont add repeated nor the 1st "All fonts"
        //if (choosenWordStyleIndex != 0) { //add new item if 
        var lItem = mapPSList.add("item", choosenWordStyle).subItems[0].text = choosenIndesignStyle;
        //}
    }


    //Remove mapped styles ——————————————————————————————————————————————————
    removeMappingButton.onClick = function () {
        var choosenWordStyle = wordStyles_Dropdown.selection.text;
        var choosenIndesignStyle = inDesignStyles_Dropdown.selection.text;

        var choosenWordStyleIndex = wordStyles_Dropdown.selection.index;

        for (var i = mapPSList.selection.length - 1; i > -1; i--)
            mapPSList.remove(mapPSList.selection[i]);
    }


    ////////////////////////////////  GENERATIVE STYLES ////////////////////////////////////////////////

    var stackGenerativeStyles = mapStylesTab.add('group');
    stackGenerativeStyles.orientation = 'stack';
    stackGenerativeStyles.alignment = "left";

    //Stack
    generativeStylesStatic = stackGenerativeStyles.add("group").add("statictext", undefined, "Automatic Styles");
    generativeStylesStatic.parent.alignment = ['left', 'top'];
    generativeStylesStatic.parent.margins = [30, 0, 0, 0]; // Allows to left-indent the dropdown as desired 

    generativeStylesCheck = stackGenerativeStyles.add("group").add("checkbox", undefined, " ");
    generativeStylesCheck.parent.alignment = ['left', 'top'];
    generativeStylesCheck.parent.margins = [10, 1, 0, 0]; // Allows to left-indent the dropdown as desired 

    //atribute inicial value
    generativeStylesCheck.value = generativeStylesUI;

    // ................................... Tratamento checkboxes ................................
    // ..........................................................................................




    keepStylesCheck.onClick = function () {
        keepStylesCheck_updateCorrespondingUI();
    }

    mapStylesCheck.onClick = function () {
        mapStylesCheck_updateCorrespondingUI();
    }


    generativeStylesCheck.onClick = function () {
        generativeStylesCheck_updateCorrespondingUI();
    }




    //disable Map styles tab
    mapStylesTab.enabled = false;


    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ FreeStyle TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    var freeStyleTab = tabPanel.add('tab', undefined, "Experimental");
    freeStyleTab.margins = [10, 15, 0, 0];


    var chooseFreePanel = freeStyleTab.add('panel', undefined, 'Choose experimental function to use ');
    chooseFreePanel.alignment = ['fill', 'top'];
    chooseFreePanel.alignChildren = "left";

    var white_space = chooseFreePanel.add("statictext", undefined, "");
    white_space.preferredSize.height = 3;

    // ———————— Functions 
    experimental_backgroundColour = chooseFreePanel.add("checkbox", undefined, "Two Colours Background");
    experimental_GradientColour = chooseFreePanel.add("checkbox", undefined, "Create Gradients");
    experimental_ParagraphIndents = chooseFreePanel.add("checkbox", undefined, "Random Paragraph Indents");
    experimental_BigCover = chooseFreePanel.add("checkbox", undefined, "Fit Title to Cover");

    //update inicial value according to JSON
    experimental_GradientColour.value = create_gradients;

    experimental_backgroundColour.value = create_shapes;

    experimental_ParagraphIndents.value = randomTextIndent;

    experimental_BigCover.value = createBigCover;



    var separatorTab = tabPanel.add('tab', undefined, "");
    separatorTab.enabled = false;
    separatorTab.margins = 0;


    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ LOG TAB ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


    logTab = tabPanel.add('tab', undefined, "Properties");
    logTab.margins = [10, 15, 0, 0];

    logTab.enabled = false;

    var logPanel = logTab.add('panel', undefined, 'Generated Document Properties ');
    logPanel.alignment = ['fill', 'top'];

    //word
    var white_space = logPanel.add("statictext", undefined, "");
    white_space.preferredSize.height = 3;


    // ——— variable ———————— value ——————
    // |              |                 |
    // |              |                 |
    // |              |                 |
    // ——————————————————————————————————

    // List of mapped styles
    //
    generationPreferencesList = logPanel.add("listbox", undefined, undefined, {
        numberOfColumns: 2,
        showHeaders: true,
        columnTitles: ["Propertie                                   ", "Value    "],
        multiselect: false
        //columnWidths: [350, 50, 200, 100]
    });
    generationPreferencesList.margins = [0, 0, 0, 0];
    generationPreferencesList.alignment = ["fill", "fill"];
    generationPreferencesList.preferredSize.height = 263;
    //mapList.preferredSize.width = 400;


    //add generation preferences
    //  addGenerationPreferences();



    savedStatic = logPanel.add("statictext", undefined, "Saved on Desktop");
    savedStatic.visible = false;
    //savedStatic.alignment = "right";


    var saveDocumentPro = logPanel.add("statictext", undefined, "Save Document Properties:");
    saveDocumentPro.alignment = 'left';

    var saveSettingsGroup = logPanel.add("group");
    saveSettingsGroup.orientation = "row";
    saveSettingsGroup.alignment = ["fill", "fill"];

    var saveStatic = saveSettingsGroup.add("statictext", undefined, "File name:");
    saveStatic.alignment = "right";
    saveRulesFileField = saveSettingsGroup.add("edittext", undefined, "rules");
    saveRulesFileField.alignment = "left";
    saveRulesFileField.alignment = ["fill", "fill"];




    saveSettingsButton = logPanel.add("button", undefined, "Save Properties", {
        name: "Save"
    });
    saveSettingsButton.size = [buttonWidth, buttonHeight];
    //saveSettingsButton.alignment = 'fill';
    saveSettingsButton.alignment = 'center';



    //logTab.enabled = false;
    //logTab.visible = false;


    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ TABBED PANNEL END ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


    tabPanel.selection = documentTab;

    //$.writeln("tabPanel.selection " + tabPanel.children[0]);
    //tabPanel.selection = tabPanel.children[3];

    //tabPanel.selection = inputDocument;
    ////tabPanel.selection = fontsTab;
    //tabPanel.selection = mapStylesTab;




    ////////////////////////////  CHECK BOXES  ///////////////////////////
    //////////////////////////////////////////////////////////////////////

    //Margins
    generativeMarginsCheck.onClick = function () {
        generativeMarginsCheck_updateCorrespondingUI();
    }


    ///////////////////////////  PROGRESS BAR  //////////////////////////////
    ////////////////////////////////////////////////////////////////////

    var progressBarGroup = w.add("group");
    progressBarGroup.alignment = ["fill", "fill"];
    progressBarGroup.margins = [minUiMargin * 2, 10, minUiMargin * 2, 10];

    progressBar = progressBarGroup.add("progressbar", undefined, 0, 12);
    //progressBar.alignment = ["fill", "fill"];
    progressBar.value = 0;

    // DiogoFerreira
    progressBar.preferredSize = [435, 5];
    progressBar.visible = false;
    //progressBar.visible = true;


    /////////////////////////////  BOTOES  ///////////////////////////////
    //////////////////////////////////////////////////////////////////////
    myButtonGroup = w.add("group");
    //left, top, right, bottom
    //myButtonGroup.margins = [0, 0, 0, 0];

    //Cancel
    var cancelButton = myButtonGroup.add("button", undefined, "Cancel", {
        name: "cancel"
    });
    cancelButton.size = [buttonWidth, buttonHeight];

    //Create
    createButton = myButtonGroup.add("button", undefined, "Create", {
        name: "ok"
    });

    createButton.size = [buttonWidth, buttonHeight];
    createButton.enabled = false;


    //Create
    createOtherButton = myButtonGroup.add("button", undefined, "Create new");
    createOtherButton.size = [buttonWidth, buttonHeight];
    createOtherButton.visible = false;
    //
    myButtonGroup.margins = [95, 0, 0, 0];


    createOtherButton.onClick = function () {

        createBaseDocument();
        analiseWordDocument();
        createButton.enabled = true;

        createOtherButton.visible = false;
        myButtonGroup.margins = [95, 0, 0, 0];
        myButtonGroup.layout.layout(true);


        //colocar no aparecer botão
        // createOtherButton.visible = true;
        // myButtonGroup.margins = [0, 0, 0, 0];
        // myButtonGroup.layout.layout(true);
    }


    //createOtherButton.visible = false;

    //e.graphics.foregroundColor = e.graphics.newPen(e.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1); 
    // var colorBajorazzz = w.graphics.backgroundColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0, 0, 1]);
    // createButton.graphics.backgroundColor = colorBajorazzz;

    // var red = w.graphics.newPen(w.graphics.BrushType.SOLID_COLOR, [1, 0, 0], 1);
    // createButton.graphics.backgroundColor = red;
    // languageStatic.graphics.foregroundColor = red;


    cancelButton.onClick = function () {
        w.close();
    }



    //Update corresponding UI according to its inicial value
    generateDocumentCheck_updateCorrespondingUI();

    generativeMarginsCheck_updateCorrespondingUI();
    generativeColumnsandGutterCheck_updateCorrespondingUI();
    generatePageSizeCheck_updateCorrespondingUI();

    //MAP STYLES TAB
    generativeStylesCheck_updateCorrespondingUI();
    keepStylesCheck_updateCorrespondingUI();
    mapStylesCheck_updateCorrespondingUI();



    //////////////////////////////////////////////////////////////////////
    w.show();
}




function updateUI() {

    //document size
    widthValueField.text = docWidth;
    heightValueField.text = docHeight;

    //gutter
    gutterValueField.text = gutterSize;

    //margins
    topMarginValueField.text = topMargin;
    bottomMarginValueField.text = bottomMargin;
    insideMarginValueField.text = insideMargin;
    outsideMarginValueField.text = outsideMargin;

    //Columns
    columnsText.text = numColumns;


    //updateOthers
    //
    generateDocumentCheck.value = generativeDocument;
    generativeMarginsCheck.value = generativeMargins;
    generativeColumns_andGutter_Check.value = generativeColumns;
    generatePageSizeCheck.value = generatePageSize;

    generativeStylesCheck.value = generativeStylesUI;


    //Experimental
    experimental_backgroundColour.value = create_shapes;
    experimental_GradientColour.value = create_gradients;
    experimental_ParagraphIndents.value = randomTextIndent;
    experimental_BigCover.value = createBigCover;

    //Update corresponding UI according to its inicial value
    //
    generateDocumentCheck_updateCorrespondingUI();

    generativeMarginsCheck_updateCorrespondingUI();
    generativeColumnsandGutterCheck_updateCorrespondingUI();
    generatePageSizeCheck_updateCorrespondingUI();

    //MAP STYLES TAB
    generativeStylesCheck_updateCorrespondingUI();
    keepStylesCheck_updateCorrespondingUI();
    mapStylesCheck_updateCorrespondingUI();
}


///////////////////////////// Update UI on the beging and on clicks ////////////////////


function generateDocumentCheck_updateCorrespondingUI() {
    if (generateDocumentCheck.value) {
        PageSizePnl.enabled = false;

        dropdownPageSizes.enabled = false;

        marginsPanel.enabled = false;
        columnsGutterPanel.enabled = false;
    } else {
        PageSizePnl.enabled = true;
        dropdownPageSizes.enabled = true;
        marginsPanel.enabled = true;
        columnsGutterPanel.enabled = true;


        // Update others to correspond
        generatePageSizeCheck_updateCorrespondingUI();
        generativeMarginsCheck_updateCorrespondingUI();
        generativeColumnsandGutterCheck_updateCorrespondingUI();
    }
}



function generativeMarginsCheck_updateCorrespondingUI() {

    if (generativeMarginsCheck.value) { //Se check = true, desativa os inputs
        topMarginValueField.enabled = false;
        bottomMarginValueField.enabled = false;
        insideMarginValueField.enabled = false;
        outsideMarginValueField.enabled = false;

        topStatic.enabled = false;
        bottomStatic.enabled = false;
        insideStatic.enabled = false;
        outsideStatic.enabled = false;
    } else {
        topMarginValueField.enabled = true;
        bottomMarginValueField.enabled = true;
        insideMarginValueField.enabled = true;
        outsideMarginValueField.enabled = true;

        topStatic.enabled = true;
        bottomStatic.enabled = true;
        insideStatic.enabled = true;
        outsideStatic.enabled = true;
    }
}



function generativeColumnsandGutterCheck_updateCorrespondingUI() {
    if (generativeColumns_andGutter_Check.value) { //Colunas Generativas (leitura do JSON)
        //generativeColumns_andGutter_Check.value = true;
        columnsStaticText.enabled = false;
        columnsText.enabled = false;

        gutterValueField.enabled = false;
        gutterStatic.enabled = false;
    } else {    //Colunas não generativas (leitura do JSON)
        //generativeColumns_andGutter_Check.value = false;
        columnsStaticText.enabled = true;
        columnsText.enabled = true;

        gutterValueField.enabled = true;
        gutterStatic.enabled = true;
    }
}


function generatePageSizeCheck_updateCorrespondingUI() {

    if (generatePageSizeCheck.value) {
        widthStatic.enabled = false;
        widthValueField.enabled = false;

        heightStatic.enabled = false;
        heightValueField.enabled = false;

        dropdownPageSizes.enabled = false;
    } else {
        widthStatic.enabled = true;
        widthValueField.enabled = true;

        heightStatic.enabled = true;
        heightValueField.enabled = true;

        dropdownPageSizes.enabled = true;
    }
}


// MAP STYLES PANNEL
function generativeStylesCheck_updateCorrespondingUI() {

    if (generativeStylesCheck.value) { //Se está checked
        mapPanel.enabled = false;
        staticMapStyles.enabled = false;
        mapStylesCheck.value = false;

        keepStylesStatic.enabled = false;
        keepStylesCheck.value = false;

        generativeStylesStatic.enabled = true;
    }
}


function keepStylesCheck_updateCorrespondingUI() {
    if (keepStylesCheck.value) { //Se está checked
        mapPanel.enabled = false;
        staticMapStyles.enabled = false;
        mapStylesCheck.value = false;

        keepStylesCheck.enabled = true;

        generativeStylesStatic.enabled = false;
        generativeStylesCheck.value = false;

        keepStylesStatic.enabled = true;
    }
}

function mapStylesCheck_updateCorrespondingUI() {
    if (mapStylesCheck.value) { //Se está checked
        mapPanel.enabled = true;
        staticMapStyles.enabled = true;

        keepStylesCheck.value = false;

        generativeStylesStatic.enabled = false;
        generativeStylesCheck.value = false;

        keepStylesStatic.enabled = false;
    }
}

function addGenerationPreferences() {
    generationPreferencesList.add("item", app.activeDocument.name);
    generationPreferencesList.add("item", "Imported Document").subItems[0].text = userWordDocument;
    generationPreferencesList.add("item", "Language").subItems[0].text = documentLanguage;
    generationPreferencesList.add("item", "Width").subItems[0].text = docWidth + " mm";
    generationPreferencesList.add("item", "Height").subItems[0].text = docHeight + " mm";
    generationPreferencesList.add("item", "Top Margin").subItems[0].text = topMargin + " mm";
    generationPreferencesList.add("item", "Outside Margin").subItems[0].text = outsideMargin + " mm";
    generationPreferencesList.add("item", "Bottom Margin").subItems[0].text = bottomMargin + " mm";
    generationPreferencesList.add("item", "Inside Margin").subItems[0].text = insideMargin + " mm";
    generationPreferencesList.add("item", "Columns").subItems[0].text = numColumns;
    generationPreferencesList.add("item", "Gutter").subItems[0].text = gutterSize + " mm";
    generationPreferencesList.add("item", "").subItems[0].text = " ";
}



function appear_createnew_button() {
    createButton.enabled = false;
    createOtherButton.visible = true;

    myButtonGroup.margins = [30, 0, 0, 0];
    myButtonGroup.layout.layout(true);
}