//Creates the base of the document (spreads, texts frames, page numbering…)

//MAster spread A
var myMasterSpread;

//Calc width of each columns in mm
var columnWidth;

//Paragraph Style
var bodyTextParagraphStyle;

//Create Paragraph styles to apply to masters
// var PScentered;
// var PSAlignLeft;
// var PSAlignRight;


function createBaseDocument() {
    //create a new document that will be used to make the layout
    myDocument = app.documents.add();
}

function createDocument(documentPages) {
    //myDocument = app.documents.add();
    //myDocument = app.documents.item(0);
    myDocument.viewPreferences.rulerOrigin;

    with (myDocument.textDefaults) {
        alignToBaseline = true;
        hyphenation = false;

        //DiogoFerreira
        // try {
        //     appliedFont = app.fonts.item("Founders Grotesk");
        // } catch (e) { }

        appliedLanguage = documentLanguage;
    }

    with (myDocument.documentPreferences) {

        pagesPerDocument = documentPages; //PAGES PER DOCUMENT

        // UNITS
        horizontalMeasurementUnits = MeasurementUnits.millimeters;
        verticalMeasurementUnits = MeasurementUnits.millimeters;
        myDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

        //DOCUMENT SIZE
        pageWidth = docWidth;
        pageHeight = docHeight;

        //pageOrientation = PageOrientation.portrait; //orientation

        //BLEED — VALOR FIXO BASE
        documentBleedUniformSize = true;
        documentBleedTopOffset = "3mm";

        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ CREATE BASE MASTER ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        myMasterSpread = myDocument.masterSpreads.item(0);
        //Get a reference to the margin preferences of the first page in the master spread. 
        var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;

        //correct Bottom Margin to match with one baseline
        correctBottomMargin();

        // -- LEFT PAGE
        //
        //MARGINS
        myMarginPreferences.left = insideMargin; //***left and right trocados não sei porque***
        myMarginPreferences.top = topMargin;
        myMarginPreferences.right = outsideMargin;
        myMarginPreferences.bottom = bottomMargin;

        //COLUNAS E GOTEIRA
        myMarginPreferences.columnCount = numColumns;
        myMarginPreferences.columnGutter = gutterSize;

        // -- RIGHT PAGE
        //
        var myMarginPreferences = myMasterSpread.pages.item(1).marginPreferences;
        //MARGINS
        myMarginPreferences.left = insideMargin;
        myMarginPreferences.top = topMargin;
        myMarginPreferences.right = outsideMargin;
        myMarginPreferences.bottom = bottomMargin;

        //COLUNAS E GOTEIRA
        myMarginPreferences.columnCount = numColumns;
        myMarginPreferences.columnGutter = gutterSize;


        //BASELINE GRID
        //———————————————————————————————————
        var myGridPreferences = myDocument.gridPreferences;

        myGridPreferences.baselineDivision = baseline;
        myGridPreferences.baselineStart = myMarginPreferences.top;
        myGridPreferences.baselineGridShown = true;

        //REMOVE ALL TEXT FRAMES = Clean document
        app.activeDocument.textFrames.everyItem().remove();

        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ CREATE MAIN (OTHER) MASTER PAGES ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

        //Create Paragraph styles to apply to masters
        // PScentered = createParagraphStyles("Centered", "Founders Grotesk", "Regular", Justification.CENTER_ALIGN);
        // PSAlignLeft = createParagraphStyles("Left align", "Founders Grotesk", "Regular", Justification.LEFT_ALIGN);
        // PSAlignRight = createParagraphStyles("Right Align", "Founders Grotesk", "Regular", Justification.RIGHT_ALIGN);
    }
    //END OF DOCUMENT PREFERENCES

    //create body text PS
    //createBodyTextParagraphStyle();


    //Calc width of each columns in mm
    columnWidth = ((docWidth - outsideMargin - insideMargin) - (gutterSize * (numColumns - 1))) / numColumns;

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    //Check characters per line
    //calcCharacteresPerLine();




    var textFrameWidth = 20;
    //var textFrameHeight = 10;

    //    A
    //    ——————————————— 
    //    |--  2 |  -- 3|
    //    |      |      |
    //    |      |      |
    //    |      |      |
    //    ———————————————

    var leftPageNumberBounds = [0, docWidth - insideMargin - textFrameWidth, topMargin, docWidth - insideMargin];
    var rightPageNumberBounds = [0, docWidth - outsideMargin - textFrameWidth, topMargin, docWidth - outsideMargin];

    var leftSectionMarkerBounds = [0, outsideMargin, topMargin, docWidth - insideMargin];
    var rightSectionMarkerBounds = [0, insideMargin, topMargin, docWidth - outsideMargin];


    var sectionMarkerPS = app.activeDocument.paragraphStyles.item("Section PS");


    firstMasterSpreadNumberingAndSections(
        0, //rotationAngle
        leftPageNumberBounds, //leftPageNumberBounds
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle    left
        sectionMarkerPS, //leftPageNumberParagraphStyle    right
        sectionMarkerPS, //rightPageNumberParagraphStyle   right
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage


    createAllMasters();

    createAndLinkTextFramesOnPages();

    linkTextFramesBetweenSpreads();
}


function createAndLinkTextFramesOnPages() {

    var allPages = myDocument.pages;

    for (var pag = 0; pag < allPages.length; pag++) {

        //on right pages
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        if (pag % 2 == 0) {

            //draw text frames and set name 
            for (var i = 0; i < numColumns; i++) {

                var rightMasterTextFrame = myDocument.pages.item(pag).textFrames.add();
                rightMasterTextFrame.geometricBounds = [topMargin,
                    insideMargin + (columnWidth * i) + (gutterSize * i),
                    docHeight - bottomMargin,
                    insideMargin + columnWidth + (columnWidth * i) + (gutterSize * i)]; //top, left, bottom, and right 

                rightMasterTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
                //rightMasterTextFrame.contents = TextFrameContents.placeholderText; //placeholder text

                //Uma coluna
                if (numColumns == 1) {
                    rightMasterTextFrame.name = "right";
                }

                //Mais do que uma coluna
                //Primeira caixa da direita
                if (numColumns > 1) {
                    if (i == 0) {   //first text frame
                        rightMasterTextFrame.name = "firstRight_" + i;
                    } else if (i === numColumns - 1) {  //last
                        rightMasterTextFrame.name = "lastRight_" + i;
                    } else {    //others
                        rightMasterTextFrame.name = "right_" + i;
                    }
                }


            }



            //Link all text frames on the right pages
            //if numColumnas > 0

            var allRightTextFrames = myDocument.pages.item(pag).textFrames;

            if (numColumns > 1) {
                for (var i = 0; i < allRightTextFrames.length - 1; i++) { //-2 porque 1 é a paginação e o ultimo não se liga
                    var tf = allRightTextFrames[i];

                    //if (tf.nextTextFrame == null || tf.previousTextFrame == null) {
                    allRightTextFrames[i].previousTextFrame = allRightTextFrames[i + 1];
                    //}
                }
            }



            // LINK LEFT AND RIGHT TEXT FRAMES ON SPREAD
            //Se não é a primeira página e so ha uma coluna ele liga os spreads
            if (pag > 0 && numColumns == 1) {

                var rightFrame = myDocument.pages.item(pag).textFrames.itemByName("right");
                var leftFrame = myDocument.pages.item(pag - 1).textFrames.itemByName("left");

                leftFrame.nextTextFrame = rightFrame;
            }



            //se não está na primeira página liga os spreads
            if (pag > 0 && numColumns > 1) {

                //Link last left and first right textFrames
                //var masterSpreadName = myMasterSpread.name;

                //var lastLeft_tf = "lastLeft_" + (numColumns - 1);

                var rightFrame = myDocument.pages.item(pag).textFrames.itemByName("firstRight_0");
                var leftFrame = myDocument.pages.item(pag - 1).textFrames.itemByName("lastLeft_" + (numColumns - 1));


                leftFrame.nextTextFrame = rightFrame;

            }
        }


        // on left pages
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        if (pag % 2 == 1) {

            for (var i = 0; i < numColumns; i++) {
                var leftMasterTextFrame = myDocument.pages.item(pag).textFrames.add();
                leftMasterTextFrame.geometricBounds = [topMargin,
                    outsideMargin + (columnWidth * i) + (gutterSize * i),
                    docHeight - bottomMargin,
                    outsideMargin + columnWidth + (columnWidth * i) + (gutterSize * i)]; //top, left, bottom, and right 

                leftMasterTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
                //leftMasterTextFrame.contents = TextFrameContents.placeholderText; //placeholder text

                //Uma coluna
                //dá nome e sai
                if (numColumns == 1) {
                    leftMasterTextFrame.name = "left";
                }


                //Mais do que uma coluna
                //first left textframe
                if (numColumns > 1) {
                    if (i == 0 && numColumns > 1) { //First text frame
                        leftMasterTextFrame.name = "firstLeft_" + i;
                    } else if (i === numColumns - 1 && numColumns > 1) {    //last left textframe
                        leftMasterTextFrame.name = "lastLeft_" + i;
                    } else {    //others
                        leftMasterTextFrame.name = "left_" + i;
                    }
                }

            }


            //Link all text frames on the left page
            //
            //if numColumnas > 0
            var allLeftTextFrames = myDocument.pages.item(pag).textFrames;

            if (numColumns > 1) {
                for (var i = 0; i < allLeftTextFrames.length - 1; i++) { //-2 porque 1 é a paginação e o ultimo não se liga
                    var tf = allLeftTextFrames[i];

                    //if (tf.nextTextFrame == null || tf.previousTextFrame == null) {
                    allLeftTextFrames[i].previousTextFrame = allLeftTextFrames[i + 1];
                    //}
                }
            }
        }
    }

    $.writeln("acabou de criar e ligar text frames nas paginas");
}

//PAGE ITEMS
//http://cssdk.s3-website-us-east-1.amazonaws.com/sdk/1.0/docs/WebHelp/app_notes/indesign_page_items.html
function linkTextFramesBetweenSpreads() {

    var allPages = myDocument.pages;

    for (var pag = 0; pag < allPages.length - 1; pag++) {

        //$.writeln("passou aqui 99999");

        //se só há uma coluna de texto
        if (pag % 2 == 0 && numColumns == 1) {
            var lastRight = allPages[pag].textFrames.itemByName("right");
            var firstLeft = allPages[pag + 1].textFrames.itemByName("left");

            lastRight.nextTextFrame = firstLeft;
        }

        //de duas em duas páginas
        if (pag % 2 == 0 && numColumns > 1) {
            //NAS MASTERS
            //var lastRight = myDocument.masterSpreads.item(0).pages.item(1).textFrames.itemByName("lastRight").override(myDocument.pages.item(pag));
            //var firstLeft = myDocument.masterSpreads.item(0).pages.item(0).textFrames.itemByName("firstLeft").override(myDocument.pages.item(pag + 1));
            //lastRight.nextTextFrame = firstLeft;

            var lastRight = allPages[pag].textFrames.itemByName("lastRight_" + (numColumns - 1));
            var firstLeft = allPages[pag + 1].textFrames.itemByName("firstLeft_0");

            lastRight.nextTextFrame = firstLeft;
        }
    }
}


//Check characters per line
function calcCharacteresPerLine() {

    $.writeln("calc Caracteres por linha");
    $.writeln("");


    // //$.writeln("page width   " + app.activeDocument.documentPreferences.pageWidth);
    // app.activeDocument.documentPreferences.pageWidth = "200mm";
    // app.activeDocument.documentPreferences.pageHeight = "200mm";

    //update
    columnWidth = ((docWidth - outsideMargin - insideMargin) - (gutterSize * (numColumns - 1))) / numColumns;

    //CHECK CHARACTERS PER LINE

    //create text frame on first master page
    var checkTextFrame = myMasterSpread.pages.item(0).textFrames.add();

    checkTextFrame.geometricBounds = [topMargin,
        outsideMargin,
        docHeight - bottomMargin,
        outsideMargin + columnWidth]; //top, left, bottom, and right 

    //
    checkTextFrame.parentStory.appliedParagraphStyle = bodyTextParagraphStyle;

    checkTextFrame.contents = TextFrameContents.placeholderText; //placeholder text

    //checkTextFrame.paragraphs.everyItem().appliedParagraphStyle = bodyTextParagraphStyle;


    var lines = checkTextFrame.lines.everyItem(); //Get the lines
    $.writeln("Number of lines " + lines.length);
    var numberOfLines = checkTextFrame.lines.count(); //Get the number of lines


    var medianValues = [];

    for (var line = 0; line < numberOfLines; line++) {
        medianValues.push(lines.length[line]);
        //avgCharacterPerLine += lines.length[line];
    }

    var medianCharacterPerLine = Math.round(median(medianValues));


    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ CHECK ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


    $.writeln("***********************************************");
    $.writeln("");
    $.writeln(medianCharacterPerLine + " MEDIAN");
    $.writeln(maxCharactersLine + " MAX");
    $.writeln(minCharactersLine + " Min");
    $.writeln("");


    // Solution 1 ///////// PERFECT ////////////////////////////////////////////////////////////////////
    //
    //If 1 (one) column is perfect
    if (medianCharacterPerLine >= minCharactersLine && medianCharacterPerLine <= maxCharactersLine) {
        $.writeln("linha de " + medianCharacterPerLine + " caracteres");
        $.writeln("PERFEITA !!!!!!");
        //checkTextFrame.remove();

        // adicionar resto das masters
        createAllMasters();


        return false; //para sair da função
    }





    // Solution 2 /////////////////////////////////////////////////////////////////////////////////////
    //
    //If 1(one) column is too much - demasiados caracteres por linha -> aumentar fonte, aumentar margens
    // + + + + + + + + + + + + + + + + + + + + + + 
    if (medianCharacterPerLine > maxCharactersLine) {
        $.writeln("");
        $.writeln("!!!!! Demasiado comprida !!!!!!!!");
        $.writeln("linha de " + medianCharacterPerLine + " caracteres");

        var actualFontSize = bodyTextParagraphStyle.pointSize;

        $.writeln(" ~~~~~~~~~~~ ");
        $.writeln("actualFontSize  " + actualFontSize);
        $.writeln("insideMargin  " + insideMargin + "   --  " + maxInsideMargin);
        $.writeln("outsideMargin  " + outsideMargin + "   --  " + maxOutsideMargin);
        $.writeln(" ~~~~~~~~~~~ ");

        if (actualFontSize < maxFontSize) { //se a fonte ainda poder ser aumentada  
            $.writeln("++++++ Aumentar font size ++++++");
            bodyTextParagraphStyle.pointSize = actualFontSize + 1;

            checkTextFrame.remove(); //remover o text frame para não desenhar uns por cima dos outros
            calcCharacteresPerLine(); //correr de novo o check para ver se assim já dá
            //return false; //para sair da função
        } else if (insideMargin < maxInsideMargin || outsideMargin < maxOutsideMargin) {
            $.writeln("++++++ Aumentar margins ++++++");

            if (insideMargin < maxInsideMargin) {
                insideMargin++;
            }

            if (outsideMargin < maxOutsideMargin) {
                outsideMargin++;
            }

            $.writeln("outsideMargin " + outsideMargin);
            $.writeln("maxOutsideMarginMargin " + maxOutsideMargin);
            $.writeln("insideMargin " + insideMargin);
            $.writeln("maxInsideMargin " + maxInsideMargin);


            // Update Margins

            // -- LEFT PAGE
            var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;

            myMarginPreferences.left = insideMargin; //***left and right trocados não sei porque***
            myMarginPreferences.right = outsideMargin;

            // -- RIGHT PAGE
            var myMarginPreferences = myMasterSpread.pages.item(1).marginPreferences;

            myMarginPreferences.left = insideMargin;
            myMarginPreferences.right = outsideMargin;


            checkTextFrame.remove();
            calcCharacteresPerLine(); //correr de novo o check para ver se assim já dá
            //return false; //para sair da função
        }

        // else { //já foi diminuido até ao tamanho minimo da fonte, é preciso mudar as colunas
        //     $.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
        //     $.writeln(" É necessário AUMENTAR as colunas!!!! ");
        //     $.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
        //     $.writeln("colunas = " + numColumns);


        //     numColumns += 1;
        //     $.writeln("novas colunas = " + numColumns);

        //     //Update columns
        //     //
        //     //left page
        //     var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;
        //     myMarginPreferences.columnCount = numColumns;
        //     //right page
        //     var myMarginPreferences = myMasterSpread.pages.item(1).marginPreferences;
        //     myMarginPreferences.columnCount = numColumns;


        //     checkTextFrame.remove();
        //     calcCharacteresPerLine();
        // }
    }

    /*
 
        // Solution 3 /////////////////////////////////////////////////////////////////////////////////////
        //
        //If 1(one) column is too short - poucos caracteres por linha -> diminuir fonte, diminuir margens
        // - - - - - - - - - - - - - - - - - - - - -
        if (avgCharacterPerLine < minCharactersLine) {
            $.writeln("linha de " + avgCharacterPerLine + " caracteres");
            $.writeln("!!!!! Demasiado curta !!!!!!!!");
            var actualFontSize = bodyTextParagraphStyle.pointSize;
 
            //se a fonte ainda pode ser reduzida
            if (actualFontSize > minFontSize) {
                $.writeln("------ Diminuir font size ------");
                $.writeln("ºººº");
                bodyTextParagraphStyle.pointSize = actualFontSize - 1;
                //remover o text frame para não desenhar uns por cima dos outros
                checkTextFrame.remove();
                //correr de novo o ckeck para ver se assim já dá
                calcCharacteresPerLine();
            } else { //já foi diminuido até ao tamanho minimo da fonte, é preciso mudar as colunas
                $.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
                $.writeln(" É necessário DIMINUIR as colunas!!!! ");
                $.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
                //            numColumns = numColumns - 1;
                //            createDocument();
            }
        }
        
        */

}


//MASTERS NUMBERING AND SECTION MARKERS
//
//First
function firstMasterSpreadNumberingAndSections(rotationAngle, leftPageNumberBounds, rightPageNumberBounds, leftSectionMarkerBounds, rightSectionMarkerBounds, SectionMarkerParagraphStyle, leftPageNumberParagraphStyle, rightPageNumberParagraphStyle, autoSizingReferenceLeftPage, autoSizingReferenceRightPage) {

    //create new master spread before last one
    var firstMasterSpread = myDocument.masterSpreads.item(0);

    //clean all textFrames from new master
    firstMasterSpread.textFrames.everyItem().remove();

    var leftMasterPage = firstMasterSpread.pages.item(0);
    var rightMasterPage = firstMasterSpread.pages.item(1);

    //PAGE NUMBERS ➁➁➁➁➁➁➁    ➂➂➂➂➂➂➂➂
    //
    var newLeftPageNumberBounds = leftPageNumberBounds;
    var newRightPageNumberBounds = rightPageNumberBounds;

    var leftPageNumber = leftMasterPage.textFrames.add();
    leftPageNumber.geometricBounds = leftPageNumberBounds;
    leftPageNumber.contents = SpecialCharacters.autoPageNumber;
    leftPageNumber.parentStory.characters.item(0).pointSize = 12;
    leftPageNumber.parentStory.characters.item(0).leading = 14.4;
    leftPageNumber.parentStory.characters.item(0).justification = Justification.rightAlign;

    var rightPageNumber = rightMasterPage.textFrames.add();
    rightPageNumber.geometricBounds = rightPageNumberBounds;
    rightPageNumber.contents = SpecialCharacters.autoPageNumber;
    rightPageNumber.parentStory.characters.item(0).pointSize = 12;
    rightPageNumber.parentStory.characters.item(0).leading = 14.4;
    rightPageNumber.parentStory.characters.item(0).justification = Justification.rightAlign;


    //SECTIONS MARKERS ⊠⊠⊠⊠⊠⊠⊠⊠    ⊠⊠⊠⊠⊠⊠⊠⊠
    //
    var leftSectionMarker = leftMasterPage.textFrames.add();
    leftSectionMarker.geometricBounds = leftSectionMarkerBounds;
    leftSectionMarker.contents = SpecialCharacters.sectionMarker;

    var rightSectionMarker = rightMasterPage.textFrames.add();
    rightSectionMarker.geometricBounds = rightSectionMarkerBounds;
    rightSectionMarker.contents = SpecialCharacters.sectionMarker;

    //APPLY PARAGRAPH STYLES
    leftPageNumber.parentStory.appliedParagraphStyle = leftPageNumberParagraphStyle;
    rightPageNumber.parentStory.appliedParagraphStyle = rightPageNumberParagraphStyle;

    leftSectionMarker.parentStory.appliedParagraphStyle = SectionMarkerParagraphStyle;
    rightSectionMarker.parentStory.appliedParagraphStyle = SectionMarkerParagraphStyle;


    //Alinhamentos consoante cada um
    leftPageNumber.parentStory.justification = Justification.RIGHT_ALIGN;
    rightPageNumber.parentStory.justification = Justification.RIGHT_ALIGN;

    leftSectionMarker.parentStory.justification = Justification.LEFT_ALIGN;
    rightSectionMarker.parentStory.justification = Justification.LEFT_ALIGN;

    //Autosizing
    //
    //Change if necessary. See http://jongware.mit.edu/idcs6js/pe_AutoSizingReferenceEnum.html
    leftPageNumber.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceLeftPage;
    leftSectionMarker.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceLeftPage;
    rightPageNumber.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceRightPage;
    rightSectionMarker.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceRightPage;

    //Change if necessary. See http://jongware.mit.edu/idcs6js/pe_AutoSizingTypeEnum.html
    leftPageNumber.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    leftSectionMarker.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    rightPageNumber.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    rightSectionMarker.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
}

//add Others

function newMasterSpreadwithNumberingAndSections(rotationAngle, leftPageNumberBounds, rightPageNumberBounds, leftSectionMarkerBounds, rightSectionMarkerBounds, SectionMarkerParagraphStyle, sectionMarkersJustification, leftPageNumberParagraphStyle, leftPageNumberJustification, rightPageNumberParagraphStyle, rightPageNumberJustification, autoSizingReferenceLeftPage, autoSizingReferenceRightPage) {

    //create new master spread before last one
    var newMasterSpread = myDocument.masterSpreads.item(0).duplicate(LocationOptions.AFTER, myDocument.masterSpreads.lastItem());

    //clean all textFrames from new master
    newMasterSpread.textFrames.everyItem().remove();

    var leftMasterPage = newMasterSpread.pages.item(0);
    var rightMasterPage = newMasterSpread.pages.item(1);

    //PAGE NUMBERS ➁➁➁➁➁➁➁    ➂➂➂➂➂➂➂➂
    //
    var newLeftPageNumberBounds = leftPageNumberBounds;
    var newRightPageNumberBounds = rightPageNumberBounds;

    var leftPageNumber = leftMasterPage.textFrames.add();
    leftPageNumber.rotationAngle = rotationAngle;
    leftPageNumber.geometricBounds = leftPageNumberBounds;
    leftPageNumber.contents = SpecialCharacters.autoPageNumber;
    leftPageNumber.parentStory.characters.item(0).pointSize = 12;
    leftPageNumber.parentStory.characters.item(0).leading = 14.4;
    leftPageNumber.parentStory.characters.item(0).justification = Justification.rightAlign;

    var rightPageNumber = rightMasterPage.textFrames.add();
    rightPageNumber.rotationAngle = rotationAngle;
    rightPageNumber.geometricBounds = rightPageNumberBounds;
    rightPageNumber.contents = SpecialCharacters.autoPageNumber;
    rightPageNumber.parentStory.characters.item(0).pointSize = 12;
    rightPageNumber.parentStory.characters.item(0).leading = 14.4;
    rightPageNumber.parentStory.characters.item(0).justification = Justification.rightAlign;


    //SECTIONS MARKERS ⊠⊠⊠⊠⊠⊠⊠⊠    ⊠⊠⊠⊠⊠⊠⊠⊠
    //
    var leftSectionMarker = leftMasterPage.textFrames.add();
    leftSectionMarker.rotationAngle = rotationAngle;
    leftSectionMarker.geometricBounds = leftSectionMarkerBounds;
    leftSectionMarker.contents = SpecialCharacters.sectionMarker;

    var rightSectionMarker = rightMasterPage.textFrames.add();
    rightSectionMarker.rotationAngle = rotationAngle;
    rightSectionMarker.geometricBounds = rightSectionMarkerBounds;
    rightSectionMarker.contents = SpecialCharacters.sectionMarker;


    //Paragraph styles
    leftPageNumber.parentStory.appliedParagraphStyle = leftPageNumberParagraphStyle;
    rightPageNumber.parentStory.appliedParagraphStyle = rightPageNumberParagraphStyle;

    leftSectionMarker.parentStory.appliedParagraphStyle = SectionMarkerParagraphStyle;
    rightSectionMarker.parentStory.appliedParagraphStyle = SectionMarkerParagraphStyle;


    //Alinhamentos
    leftPageNumber.parentStory.justification = leftPageNumberJustification;
    rightPageNumber.parentStory.justification = rightPageNumberJustification;

    leftSectionMarker.parentStory.justification = sectionMarkersJustification;
    rightSectionMarker.parentStory.justification = sectionMarkersJustification;




    //Autosizing
    //
    //Change if necessary. See http://jongware.mit.edu/idcs6js/pe_AutoSizingReferenceEnum.html
    leftPageNumber.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceLeftPage;
    leftSectionMarker.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceLeftPage;
    rightPageNumber.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceRightPage;
    rightSectionMarker.textFramePreferences.autoSizingReferencePoint = autoSizingReferenceRightPage;
    //Change if necessary. See http://jongware.mit.edu/idcs6js/pe_AutoSizingTypeEnum.html
    leftPageNumber.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    leftSectionMarker.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    rightPageNumber.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    rightSectionMarker.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
}

//body text
function createBodyTextParagraphStyle() {

    bodyTextParagraphStyle = myDocument.paragraphStyles.item("Body Text");

    try {
        var myName = bodyTextParagraphStyle.name;
    } catch (myError) {
        //The paragraph style did not exist, so create it.
        bodyTextParagraphStyle = myDocument.paragraphStyles.add({
            name: "Body Text"
        });
    }
    //We'll need to create a color. Check to see if the color already exists. 
    var myColor = myDocument.colors.item("Red");

    try {
        myName = myColor.name;
    } catch (myError) {
        //The color did not exist, so create it.
        myColor = myDocument.colors.add({
            name: "Red",
            model: ColorModel.process,
            colorValue: [0, 100, 100, 0]
        });
    }
    //Now set the formatting of the paragraph style.
    bodyTextParagraphStyle.appliedFont = "Founders Grotesk";
    bodyTextParagraphStyle.fontStyle = "Medium";
    bodyTextParagraphStyle.pointSize = 10;
    bodyTextParagraphStyle.spaceAfter = 0;
    bodyTextParagraphStyle.spaceBefore = 0;
    bodyTextParagraphStyle.alignToBaseline = true;
    bodyTextParagraphStyle.hyphenation = false;
    bodyTextParagraphStyle.justification = Justification.LEFT_ALIGN;
    bodyTextParagraphStyle.leftIndent = "0pt";
    bodyTextParagraphStyle.firstLineIndent = "12pt";


    bodyTextParagraphStyle.fillColor = myDocument.colors.item("Red");
    //Apply the style to the paragraph. 
    //myDocument.pages.item(0).textFrames.item(0).paragraphs.item(0).applyParagraphStyle(bodyTextParagraphStyle, true);
    //You could also use: 
    //myDocument.pages.item(0).textFrames.item(0).paragraphs.item(0).appliedParagraphStyle = bodyTextParagraphStyle;

    //return bodyTextParagraphStyle;

}


//Select a master to according to pages
function applyMaster_accordingToMargins() {

    //collect all masters
    var allMasters = myDocument.masterSpreads;


    //if user selected the masters he wants — CHOOSEN MASTER
    //

    if (choosenMaster >= 0 && choosenMaster < allMasters.length - 1) {
        //$.writeln("user selected the master ////////////////////");
        //apply choosen Master to all Pages
        myDocument.pages.everyItem().appliedMaster = allMasters[choosenMaster];


        //Save choosen master
        save_choosenMaster = choosenMaster;
    }
    else {  //if user dont selected the master — GENERATIVE MASTER
        // $.writeln("");
        // $.writeln("master will be choosen acoording to margins ////////////////////");

        // $.writeln("allMargins_sum   ");
        // $.writeln("topMargin " + topMargin + "   " + typeof (topMargin));
        // $.writeln("bottomMargin " + bottomMargin);
        // $.writeln("outsideMargin " + outsideMargin);
        // $.writeln("insideMargin " + insideMargin);


        //Margins percentages relative to each others
        //var allMargins_sum = parseInt(clean(topMargin)) + parseInt(clean(bottomMargin)) + parseInt(clean(outsideMargin));
        var allMargins_sum = topMargin + bottomMargin + outsideMargin;

        var topM_percentage = parseInt((topMargin * 100) / allMargins_sum);
        var bottomM_percentage = parseInt((bottomMargin * 100) / allMargins_sum);
        var outsideM_percentage = parseInt((outsideMargin * 100) / allMargins_sum);
        var insideM_percentage = parseInt((insideMargin * 100) / allMargins_sum);

        // $.writeln(allMargins_sum + "ALLLLLL");
        // $.writeln("topM_percentage   " + topM_percentage + " %");
        // $.writeln("bottomM_percentage   " + bottomM_percentage + " %");
        // $.writeln("outsideM_percentage   " + outsideM_percentage + " %");
        // $.writeln("insideM_percentage   " + insideM_percentage + " %");

        //array with margins all values
        var orderedMargins = new Array();

        orderedMargins.push({
            name: 'topMargin',
            val: topM_percentage
        });
        orderedMargins.push({
            name: 'bottomMargin',
            val: bottomM_percentage
        });
        orderedMargins.push({
            name: 'outsideMargin',
            val: outsideM_percentage
        });
        orderedMargins.push({
            name: 'insideMargin',
            val: insideM_percentage
        });


        //Order from MAX to MIN percentage
        orderedMargins.sort(function (a, b) {
            return a.val - b.val;
        }).reverse();


        //get the values and name of 2 biggest margins
        var first_biggestMargin_name = orderedMargins[0].name;
        var first_biggestMargin_value = orderedMargins[0].val;

        var second_biggestMargin_name = orderedMargins[1].name;
        var second_biggestMargin_value = orderedMargins[1].val;

        // $.writeln(" ");
        // $.writeln(first_biggestMargin_name + " 1st Bisggest margin");
        // $.writeln(second_biggestMargin_name + " 2nd Bisggest margin");

        //CHOOSE MARGIN TO PUT SECTION
        var randomValue_margins = Math.floor(Math.random() * (first_biggestMargin_value + second_biggestMargin_value + 1)) + 0;

        // $.writeln("TOTAL DAS DUAS = " + (first_biggestMargin_value + second_biggestMargin_value));
        // $.writeln("Valor do random = " + randomValue_margins);

        var choosenMarginToPutSection;

        //Mete na primeira maior
        if (randomValue_margins <= first_biggestMargin_value) {
            //$.writeln("METE NA =  " + first_biggestMargin_name);
            choosenMarginToPutSection = first_biggestMargin_name;
        }

        //Mete na segunda maior
        if (randomValue_margins > first_biggestMargin_value) {
            //$.writeln("METE NA =  " + second_biggestMargin_name);
            choosenMarginToPutSection = second_biggestMargin_name;
        }

        //Mete de lado
        //1. Se passar num random
        //2. E - Se a de cima e a de baixo forem as duas maiores
        if (Math.floor(Math.random() * (101)) < 30) {
            if (first_biggestMargin_name == 'topMargin' && second_biggestMargin_name == 'bottomMargin' || second_biggestMargin_name == 'topMargin' && first_biggestMargin_name == 'bottomMargin') { //Mete na segunda
                //$.writeln("METE NA =  both_top_and_bottom");
                choosenMarginToPutSection = 'both_top_and_bottom';
            }
        }


        //Analisa a escolha da margem e vai escolher uma master consoante isso
        switch (choosenMarginToPutSection) {
            case 'topMargin':
                var possibleMasters = [0, 2];
                var choosen_random_Master = possibleMasters[Math.floor(Math.random() * possibleMasters.length)];

                $.writeln("Choosen master ======= " + choosen_random_Master);
                break;
            case 'bottomMargin':
                var possibleMasters = [1];
                var choosen_random_Master = possibleMasters[Math.floor(Math.random() * possibleMasters.length)];

                $.writeln("Choosen master ======= " + choosen_random_Master);
                break;
            case 'outsideMargin':
                var possibleMasters = [4];
                var choosen_random_Master = possibleMasters[Math.floor(Math.random() * possibleMasters.length)];

                $.writeln("Choosen master ======= " + choosen_random_Master);
                break;
            case 'insideMargin':
                var possibleMasters = [5];
                var choosen_random_Master = possibleMasters[Math.floor(Math.random() * possibleMasters.length)];

                $.writeln("Choosen master ======= " + choosen_random_Master);
                break;
            case 'both_top_and_bottom':
                var possibleMasters = [3];
                var choosen_random_Master = possibleMasters[Math.floor(Math.random() * possibleMasters.length)];

                $.writeln("Choosen master ======= " + choosen_random_Master);
                break;
        }

        //apply choosen Master to all Pages
        myDocument.pages.everyItem().appliedMaster = allMasters[choosen_random_Master];



        //Save choosen master
        save_choosenMaster = choosen_random_Master;


        $.writeln(save_choosenMaster + "  save_choosenMaster");
        $.writeln(save_choosenMaster + "  save_choosenMaster");
        $.writeln(save_choosenMaster + "  save_choosenMaster");
        $.writeln(save_choosenMaster + "  save_choosenMaster");
    }

}


function median(numbers) {

    var median = 0,
        numsLen = numbers.length;

    numbers.sort(function (x, y) {
        return x - y;
    });

    if (numsLen % 2 === 0) { // is even
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2; // average of two middle numbers
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }

    return median;
}


function createAllMasters() {

    var textFrameWidth = 20;
    var textFrameHeight = 10;


    //    B
    //    ——————————————— 
    //    |      |      |
    //    |      |      |
    //    |      |      |
    //    |2 --  |  -- 3|
    //    ———————————————



    var leftPageNumberBounds = [docHeight - bottomMargin, outsideMargin, docHeight, outsideMargin + textFrameWidth];
    var rightPageNumberBounds = [docHeight - bottomMargin, docWidth - outsideMargin - textFrameWidth, docHeight, docWidth - outsideMargin];
    //section markers
    var leftSectionMarkerBounds = [docHeight - bottomMargin, outsideMargin, docHeight, docWidth - insideMargin];
    var rightSectionMarkerBounds = [docHeight - bottomMargin, insideMargin, docHeight, docWidth - outsideMargin];


    var sectionMarkerPS = app.activeDocument.paragraphStyles.item("Section PS");


    //Create new master 
    newMasterSpreadwithNumberingAndSections(
        0, //rotationAngle 
        leftPageNumberBounds, //leftPageNumberBounds 
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //leftPageNumberParagraphStyle
        Justification.LEFT_ALIGN,
        sectionMarkerPS, //rightPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage

    //    C
    //    ——————————————— 
    //    |2 --  |  -- 3|
    //    |      |      |
    //    |      |      |
    //    |      |      |
    //    ———————————————

    var leftPageNumberBounds = [0, outsideMargin, topMargin, outsideMargin + textFrameWidth];
    var rightPageNumberBounds = [0, docWidth - outsideMargin - textFrameWidth, topMargin, docWidth - outsideMargin];
    //section markers
    var leftSectionMarkerBounds = [0, outsideMargin, topMargin, docWidth - insideMargin];
    var rightSectionMarkerBounds = [0, insideMargin, topMargin, docWidth - outsideMargin];

    //Create new Master
    newMasterSpreadwithNumberingAndSections(
        0, //rotationAngle
        leftPageNumberBounds, //leftPageNumberBounds
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //leftPageNumberParagraphStyle
        Justification.LEFT_ALIGN,
        sectionMarkerPS, //rightPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage

    //    D
    //    ——————————————— 
    //    |  --  |  --  |
    //    |      |      |
    //    |      |      |
    //    |  2   |   3  |
    //    ———————————————

    var leftPageNumberBounds = [docHeight - bottomMargin, outsideMargin, docHeight, docWidth - insideMargin];
    var rightPageNumberBounds = [docHeight - bottomMargin, insideMargin, docHeight, docWidth - outsideMargin];
    //section markers
    var leftSectionMarkerBounds = [0, outsideMargin, topMargin, docWidth - insideMargin];
    var rightSectionMarkerBounds = [0, insideMargin, topMargin, docWidth - outsideMargin];

    //Create new Master
    newMasterSpreadwithNumberingAndSections(
        0, //rotationAngle
        leftPageNumberBounds, //leftPageNumberBounds
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //leftPageNumberParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //rightPageNumberParagraphStyle
        Justification.CENTER_ALIGN,
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage

    //    E
    //    ——————————————— 
    //    |2     |     3|
    //    |-     |     -|
    //    |-     |     -|
    //    |      |      |
    //    ———————————————

    var leftPageNumberBounds = [topMargin, 0, topMargin + textFrameWidth, outsideMargin];
    var rightPageNumberBounds = [topMargin, docWidth - outsideMargin, topMargin + textFrameHeight, docWidth];
    //section markers
    var leftSectionMarkerBounds = [topMargin, 0, docHeight - bottomMargin, outsideMargin];
    var rightSectionMarkerBounds = [topMargin, docWidth - outsideMargin, docHeight - bottomMargin, docWidth];

    //Create new Master
    newMasterSpreadwithNumberingAndSections(
        90, // rotationAngle
        leftPageNumberBounds, //leftPageNumberBounds
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //leftPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        sectionMarkerPS, //rightPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage

    //    F
    //    ——————————————— 
    //    |     2|3     |
    //    |     -|-     |
    //    |     -|-     |
    //    |      |      |
    //    ———————————————

    var leftPageNumberBounds = [topMargin, docWidth - insideMargin, docHeight - bottomMargin, docWidth];
    var rightPageNumberBounds = [topMargin, 0, docHeight - bottomMargin, insideMargin];
    //section markers
    var leftSectionMarkerBounds = [topMargin, docWidth - insideMargin, docHeight - bottomMargin, docWidth];
    var rightSectionMarkerBounds = [topMargin, 0, docHeight - bottomMargin, insideMargin];

    //Create new Master
    newMasterSpreadwithNumberingAndSections(
        90, // rotationAngle
        leftPageNumberBounds, //leftPageNumberBounds
        rightPageNumberBounds, //rightPageNumberBounds
        leftSectionMarkerBounds, //leftSectionMarkerBounds
        rightSectionMarkerBounds, //rightSectionMarkerBounds
        sectionMarkerPS, //SectionMarkerParagraphStyle
        Justification.CENTER_ALIGN,
        sectionMarkerPS, //leftPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        sectionMarkerPS, //rightPageNumberParagraphStyle
        Justification.RIGHT_ALIGN,
        AutoSizingReferenceEnum.CENTER_POINT, //autoSizingReferenceLeftPage
        AutoSizingReferenceEnum.CENTER_POINT); //autoSizingReferenceRightPage
}


function creatBlankMaster_andApply_toTitle() {

    //create new master spread before last one
    var blank_masterSpread = app.activeDocument.masterSpreads.lastItem().duplicate(LocationOptions.AFTER, app.activeDocument.masterSpreads.lastItem());

    blank_masterSpread.textFrames.everyItem().remove();

    app.activeDocument.pages.item(0).appliedMaster = blank_masterSpread;
    app.activeDocument.pages.item(1).appliedMaster = blank_masterSpread;
    app.activeDocument.pages.item(2).appliedMaster = blank_masterSpread;
    app.activeDocument.pages.item(3).appliedMaster = blank_masterSpread;
    app.activeDocument.pages.item(4).appliedMaster = blank_masterSpread;


    var page_5_Characters = app.activeDocument.pages.item(5).textFrames.everyItem().characters;

    if (page_5_Characters.length < 250) {
        app.activeDocument.pages.item(5).appliedMaster = blank_masterSpread;
    }


    var page_6_Characters = app.activeDocument.pages.item(6).textFrames.everyItem().characters;

    if (page_6_Characters.length < 250) {
        app.activeDocument.pages.item(6).appliedMaster = blank_masterSpread;
    }

    var page_6_Characters = app.activeDocument.pages.item(7).textFrames.everyItem().characters;
    if (page_6_Characters.length < 250) {
        app.activeDocument.pages.item(7).appliedMaster = blank_masterSpread;
    }

    //se criar indice
    if (createIndex_Check.value) {
        var page_6_Characters = app.activeDocument.pages.item(8).textFrames.everyItem().characters;
        if (page_6_Characters.length < 250) {

            app.activeDocument.pages.item(8).appliedMaster = blank_masterSpread;
        }


        var page_6_Characters = app.activeDocument.pages.item(9).textFrames.everyItem().characters;
        if (page_6_Characters.length < 250) {

            app.activeDocument.pages.item(9).appliedMaster = blank_masterSpread;
        }


        var page_6_Characters = app.activeDocument.pages.item(10).textFrames.everyItem().characters;
        if (page_6_Characters.length < 250) {

            app.activeDocument.pages.item(10).appliedMaster = blank_masterSpread;
        }
    }
}


//Ajust Bottom MARGIN
function correctBottomMargin() {
    var distToMarginBottomInPoints = parse_mm_to_pts(docHeight - bottomMargin);
    var marginTopInPoints = parse_mm_to_pts(topMargin);
    var docHeightInPoints = parse_mm_to_pts(docHeight);

    //max number of baselines on page
    var baselineValue = parseFloat(baseline);
    var numberOfBaselinesInPages = parseInt(docHeightInPoints / baselineValue) + 2;

    //$.writeln("distToMarginBottomInPoints " + distToMarginBottomInPoints);

    // $.writeln("marginTopInPoints " + marginTopInPoints);
    //$.writeln("docHeightInPoints " + docHeightInPoints);
    //$.writeln("numberOfBaselinesInPages " + numberOfBaselinesInPages + "     " + typeof (numberOfBaselinesInPages));

    var baseLineValues = [];


    for (var i = 0; i < numberOfBaselinesInPages; i++) {

        var atualBaselineDistFromTop = marginTopInPoints + (baselineValue * i);

        //Adicionar ao array, se a baseline estiver na página
        if (atualBaselineDistFromTop < docHeightInPoints) {
            baseLineValues.push(atualBaselineDistFromTop);
        }
    }

    for (var k = 0; k < baseLineValues.length; k++) {
        //$.writeln(k + "   " + baseLineValues[k]);

        if (baseLineValues[k] > distToMarginBottomInPoints) {
            bottomMargin = parse_pts_to_mm(docHeightInPoints - baseLineValues[k]);
            break;
        }
    }

    return bottomMargin;
}

function parse_mm_to_pts(mm) {
    //mm = mm * 2.835;
    mm = mm * 2.834646;
    return mm;
}

function parse_pts_to_mm(pts) {
    //pts = pts * 0.353;
    //pts = pts * 0.352778;
    pts = pts * 0.3527;
    return pts;
}