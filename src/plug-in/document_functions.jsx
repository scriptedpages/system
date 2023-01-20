function deleteEmptyTextFrames() {
    var myStories = app.activeDocument.stories.everyItem().getElements();
    for (i = myStories.length - 1; i >= 0; i--) {
        var myTextFrames = myStories[i].textContainers;
        for (j = myTextFrames.length - 1; j >= 0; j--) {
            if (myTextFrames[j].contents == "") {
                myTextFrames[j].remove();
            }
        }
    }
}


function deleteEmptyPages() {

    var allPages = app.activeDocument.pages;

    var document_pages = allPages.length - 1;

    //analises the pages from the last to the first one
    for (var pag = 0; pag <= document_pages; pag++) {

        var pageToBeAnalised = document_pages - pag;

        //$.writeln("Page " + pageToBeAnalised + "  has  " + allPages[pageToBeAnalised].textFrames.count());

        //If this page dont have text frames detes it
        if (allPages[pageToBeAnalised].textFrames.count() == 0) {
            allPages[pageToBeAnalised].remove();
        } else { //Exists the  cicle because next pages has content
            break;
        }
    }
}


function capset() {

    //https://forums.adobe.com/message/4959143#4959143

    //Scope: all graphics on all pages  
    //(that includes graphics of anchored objects, active states of MSOs, graphics in table cells as well)  
    var tgt = app.activeDocument.allGraphics;


    for (var i = 1; i < tgt.length; i++) {

        //Narrow the scope to all graphics on pages only:  
        if (tgt[i].parentPage != null) {

            //get image name
            try {
                var myName = tgt[i].itemLink.name;
            } catch (e) { var myName = "Undefined" };


            myName = myName.split('.')[0];

            //targets the page of the graphic:  
            var myPage = tgt[i].parentPage;

            //adds a text frame to the page of the graphic:  
            var myCaption = myPage.textFrames.add();


            //Escolha do tipo de legendas que se vai aplicar
            if (choosenCapset == 0) {
                bottom_captions(tgt, i, myCaption, myName);
                //atribui valor para guardar no json
                save_captionStyle = 0;

            } else if (choosenCapset == 1) {
                side_captions(tgt, i, myCaption, myName);
                //atribui valor para guardar no json
                save_captionStyle = 1;

            } else { // Escolhe uma hipotese random
                //var randomTreatment = Math.round(Math.random());

                //se estiver numa master que possibilite e as colunas seja só uma
                if (save_choosenMaster == 4 || save_choosenMaster == 5 || save_choosenMaster == 2 || numColumns != 1) {
                    bottom_captions(tgt, i, myCaption, myName);
                    save_captionStyle = 0;
                } else {
                    side_captions(tgt, i, myCaption, myName);
                    save_captionStyle = 1;
                }

                // if (randomTreatment == 0) {
                //     bottom_captions(tgt, i, myCaption, myName);
                // } else {
                //     side_captions(tgt, i, myCaption, myName);
                // }

            }
        }



    }

}




function bottom_captions(tgt, i, myCaption, myName) {
    myCaption.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
    myCaption.contents = myName;
    myCaption.paragraphs[0].justification = Justification.CENTER_ALIGN;
    myCaption.paragraphs[0].alignToBaseline = false;

    //myCaption.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;

    //Why visible bounds and not geometric bounds?  
    //var bnds = tgt[i].parent.visibleBounds;
    var bnds = tgt[i].parent.geometricBounds;

    //myCaption.geometricBounds = [bnds[2] + 2, bnds[1], bnds[2] + 20, bnds[3]];
    //myCaption.geometricBounds = [bnds[2], bnds[1], bnds[2] + 20, bnds[3]];
    myCaption.geometricBounds = [bnds[2] + 2, bnds[1], bnds[2] + 20, bnds[3]];
    myCaption.fit(FitOptions.FRAME_TO_CONTENT);

    myCaption.textWrapPreferences.textWrapMode = TextWrapModes.JUMP_OBJECT_TEXT_WRAP;
    //myCaption.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
    myCaption.textWrapPreferences.textWrapOffset = [0, 0, textWrap_value / 2, 0];

    myCaption.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Section PS");
    myCaption.paragraphs.everyItem().justification = Justification.CENTER_ALIGN;
}


function side_captions(tgt, i, myCaption, myName) {
    myCaption.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
    myCaption.contents = myName;
    myCaption.paragraphs[0].justification = Justification.CENTER_ALIGN;
    myCaption.paragraphs[0].alignToBaseline = false;


    var bnds = tgt[i].parent.geometricBounds;

    myCaption.rotationAngle = 90;

    //myCaption.geometricBounds = [bnds[0], bnds[1], bnds[2], bnds[3]];

    myCaption.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
    $.writeln("textWrap_value " + textWrap_value);
    myCaption.textWrapPreferences.textWrapOffset = [0, textWrap_value, 0, 0];


    myCaption.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Section PS");
    myCaption.paragraphs.everyItem().justification = Justification.CENTER_ALIGN;


    myCaption.geometricBounds = [bnds[0], bnds[1], bnds[2], app.activeDocument.pages.firstItem().marginPreferences.left + app.activeDocument.pages.firstItem().marginPreferences.right];

}




//COVER
// http://www.yourscriptdoctor.com/automating-adobe-indesign-cc-2015/adding-pages-to-indesign-document
function createCover() {

    //1
    var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.firstItem());
    newPage.move(LocationOptions.BEFORE, app.activeDocument.pages.firstItem());

    var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.firstItem());
    newPage.move(LocationOptions.BEFORE, app.activeDocument.pages.firstItem());

    var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.firstItem());
    newPage.move(LocationOptions.BEFORE, app.activeDocument.pages.firstItem());


    app.activeDocument.spreads.item(0).allowPageShuffle = false;

    //2
    var newPage3 = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.firstItem());
    newPage3.move(LocationOptions.BEFORE, app.activeDocument.pages.firstItem(), BindingOptions.LEFT_ALIGN);


    //GET TITLE OF THE BOOK
    app.findGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);

    try {
        var finds = app.activeDocument.findGrep();
    } catch (myError) { }

    app.findGrepPreferences = NothingEnum.nothing;

    if (finds.length > 0) { // something has been found
        var bookTitle_toCover = finds[0].contents;
    }

    //put title on place
    //TILE
    var tile_textFrame = app.activeDocument.pages.item(1).textFrames.add();

    tile_textFrame.geometricBounds = [app.activeDocument.pages.item(1).marginPreferences.top,
    app.activeDocument.pages.item(1).marginPreferences.left,
    app.activeDocument.pages.item(1).bounds[2] - app.activeDocument.pages.item(1).marginPreferences.bottom,
    (app.activeDocument.pages.item(1).bounds[3] / 2) - app.activeDocument.pages.item(1).marginPreferences.right]; //top, left, bottom, and right 

    tile_textFrame.contents = String(bookTitle_toCover);
    tile_textFrame.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);
    tile_textFrame.paragraphs.everyItem().capitalization = Capitalization.ALL_CAPS;


    //AUTOR
    var author_textFrame = app.activeDocument.pages.item(1).textFrames.add();

    author_textFrame.geometricBounds = [app.activeDocument.pages.item(1).marginPreferences.top,
    app.activeDocument.pages.item(1).marginPreferences.left,
    app.activeDocument.pages.item(1).bounds[2] - app.activeDocument.pages.item(1).marginPreferences.bottom,
    (app.activeDocument.pages.item(1).bounds[3] / 2) - app.activeDocument.pages.item(1).marginPreferences.right]; //top, left, bottom, and right 
    //Add author name
    var authorName = getAuthor();
    author_textFrame.contents = authorName;

    author_textFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
    author_textFrame.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);
    author_textFrame.paragraphs.everyItem().capitalization = Capitalization.ALL_CAPS;


    //BackgroundColour
    var random_Lightcolor = lightColors[Math.floor(Math.random() * lightColors.length) - 1];
    random_Lightcolor = String(random_Lightcolor);


    //Add background color to cover and backCover
    addBackgroundColor_FirstSpread();

    //BackCover
    createBackCover();
}


// BACK COVER
function createBackCover() {
    var info_textFrame = app.activeDocument.pages.item(0).textFrames.add();

    info_textFrame.geometricBounds = [app.activeDocument.pages.firstItem().marginPreferences.top,
    app.activeDocument.pages.firstItem().marginPreferences.right,
    app.activeDocument.pages.firstItem().bounds[2] - app.activeDocument.pages.firstItem().marginPreferences.bottom,
    app.activeDocument.pages.firstItem().bounds[3] - app.activeDocument.pages.firstItem().marginPreferences.left]; //top, left, bottom, and right 

    //https://www.rapidtables.com/code/text/unicode-characters.html
    info_textFrame.contents = "Livro Gerado com o Sistema Scripted Pages. \rSistema desenvolvido por Diogo Ferreira \rno \u00E2mbito da disserta\u00E7\u00E3o de Mestrado \rem Design e Multim\u00E9dia \r\rwww.scriptedpages.cdv.dei.uc.pt\r\rUniversidade de Coimbra \rSetembro 2019";

    info_textFrame.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(textParagraphStyle_name);
    info_textFrame.paragraphs.everyItem().appliedFont = app.activeDocument.paragraphStyles.item(PS_of_Title).appliedFont.name;
    info_textFrame.paragraphs.everyItem().hyphenation = false;
    info_textFrame.paragraphs.everyItem().firstLineIndent = 0;


    var pageWidth = app.activeDocument.documentPreferences.pageWidth;
    var pageHeight = app.activeDocument.documentPreferences.pageHeight;


    var barcode_container = app.activeDocument.pages.item(0).rectangles.add({
        geometricBounds: [0, 0, 76, 8.098],
        strokeWeight: "0pt"
    });

    var script_file = File($.fileName); // get the location of the script file
    var script_file_path = script_file.path; // get the path
    //var barCode = File(script_file_path + "/barcode.png");
    var barCode = File(script_file_path + "/logos.png");


    var pageWidthNoMargins = pageWidth - app.activeDocument.pages.firstItem().marginPreferences.left - app.activeDocument.pages.firstItem().marginPreferences.right;
    var newHeight = (8.098 * pageWidthNoMargins) / 76;


    barcode_container.geometricBounds = [0, 0, newHeight, pageWidthNoMargins];


    var doc = app.activeDocument;
    barcode_container.place(barCode, false);
    //barcode_container.images[0].fit(FitOptions.FILL_PROPORTIONALLY);
    barcode_container.images[0].fit(FitOptions.FILL_PROPORTIONALLY);
    //barcode_container.images[0].fit(FitOptions.centerContent);

    barcode_container.strokeWeight = "0pt";

    //http://jongware.mit.edu/idcs4js/pe_AlignDistributeBounds.html
    //http://jongware.mit.edu/idcs4js/pe_AlignOptions.html
    //http://jongware.mit.edu/idcs6js/pc_Document.html#align
    app.activeDocument.align(barcode_container, AlignOptions.BOTTOM_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
    app.activeDocument.align(barcode_container, AlignOptions.RIGHT_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
}



function addBackgroundColor_toPage(pageNumber, colour) {

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("shapesLayer");

    var basicBackgroundShape = app.activeDocument.pages.item(pageNumber).rectangles.add();

    // basicBackgroundShape.geometricBounds = [app.activeDocument.pages.item(1).marginPreferences.top,
    // app.activeDocument.pages.item(1).marginPreferences.left,
    // app.activeDocument.pages.item(1).bounds[2] - app.activeDocument.pages.item(1).marginPreferences.bottom,
    // (app.activeDocument.pages.item(1).bounds[3] / 2) - app.activeDocument.pages.item(1).marginPreferences.right]; //top, left, bottom, and right 

    basicBackgroundShape.geometricBounds = [0,
        0,
        app.activeDocument.documentPreferences.pageHeight,
        app.activeDocument.documentPreferences.pageWidth]; //top, left, bottom, and right 



    // var random_Lightcolor = lightColors[Math.floor(Math.random() * lightColors.length) - 1];
    // random_Lightcolor = String(random_Lightcolor);


    basicBackgroundShape.fillColor = app.activeDocument.colors.itemByName(colour);

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");
}



function addBackgroundColor_FirstSpread() {
    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("shapesLayer");

    var basicBackgroundShape = app.activeDocument.pages.item(0).rectangles.add();

    basicBackgroundShape.geometricBounds = [-3,
    -3,
    app.activeDocument.documentPreferences.pageHeight + 3,
    app.activeDocument.documentPreferences.pageWidth * 2 + 3]; //top, left, bottom, and right 


    var randomNumber = Math.floor(Math.random() * lightColors.length);
    var random_Lightcolor = lightColors[randomNumber];
    random_Lightcolor = String(random_Lightcolor);



    //save shoosen color to use on the rest of the book
    ChoosenColorForBook = random_Lightcolor;

    //save chossen colour
    save_ChossenLightColour = lightColors[randomNumber];

    basicBackgroundShape.fillColor = app.activeDocument.colors.itemByName(random_Lightcolor);

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");
}





function getAuthor() {
    var authorName;
    var authorPS = null;
    var finalAuthorname = "";

    try {
        authorPS = app.activeDocument.paragraphStyles.item("Author Name PS").name;
    } catch (myError) { }


    if (authorPS != null) {

        app.findGrepPreferences = NothingEnum.nothing;
        app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Author Name PS");

        try {
            var finds = app.activeDocument.findGrep();
        } catch (myError) { }

        app.findGrepPreferences = NothingEnum.nothing;

        if (finds.length > 0) { // something has been found
            var authorName = finds[0].contents;


            //Adicionar para a string apenas tudo o que não são parágrafos
            for (var i = 0; i < finds[0].contents.length; i++) {
                if (finds[0].contents[i] != "\r") {
                    finalAuthorname += finds[0].contents[i];
                } else { }
            }

        }
    }

    return finalAuthorname;
}


function create_andAd_Index() {

    if (createIndex_Check.value) {

        var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.item(4));
        newPage.appliedMaster = app.activeDocument.masterSpreads.lastItem();
        var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.item(4));
        newPage.appliedMaster = app.activeDocument.masterSpreads.lastItem();


        var index_textFrame = app.activeDocument.pages.item(6).textFrames.add();

        index_textFrame.geometricBounds = [app.activeDocument.pages.firstItem().marginPreferences.top,
        app.activeDocument.pages.firstItem().marginPreferences.left,
        app.activeDocument.pages.firstItem().bounds[2] - app.activeDocument.pages.firstItem().marginPreferences.bottom,
        app.activeDocument.pages.firstItem().bounds[3] - app.activeDocument.pages.firstItem().marginPreferences.right]; //top, left, bottom, and right 


        //GET TITLE OF THE BOOK
        app.findGrepPreferences = NothingEnum.nothing;
        app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);

        try {
            var finds = app.activeDocument.findGrep();
        } catch (myError) { }

        app.findGrepPreferences = NothingEnum.nothing;


        var index_content = "Contents\r\r\r";
        var index_topic = "";


        if (finds.length > 0) { // something has been found

            for (var i = 0; i < finds.length; i++) {

                var pageNum = null;

                try {
                    pageNum = parseInt(finds[i].parentTextFrames[0].parentPage.name);
                } catch (myError) { }


                if (pageNum != null && pageNum >= 3) {


                    for (var k = 0; k < finds[i].contents.length; k++) {
                        if (finds[i].contents[k] != "\r") {
                            index_topic += finds[i].contents[k];
                        }
                    }

                    index_content += index_topic;
                    index_content += "\u0008";
                    index_content += pageNum;
                    index_content += "\r";

                    index_topic = "";
                }
            }
        }


        //https://www.rapidtables.com/code/text/unicode-characters.html
        index_textFrame.contents = index_content;


        //treat text
        index_textFrame.paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(textParagraphStyle_name);
        index_textFrame.paragraphs[0].appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);

        index_textFrame.paragraphs.everyItem().appliedFont = app.activeDocument.paragraphStyles.item(PS_of_Title).appliedFont.name;

        index_textFrame.paragraphs.everyItem().firstLineIndent = 0;

    }
}

//correct page number to multile of 4
function correctPageNum() {
    //get number os pages of the document
    var totalPages = app.activeDocument.pages.count();

    //retirar da conta as páginas da capa
    totalPages = totalPages - 2;

    //calculate the new number multiple of 4
    var idealPages = totalPages + (4 - (totalPages % 4));
    //get the number of pages that is needed to create
    var numPag_tocreate = idealPages - totalPages;

    //create pages
    for (var i = 0; i < numPag_tocreate; i++) {
        var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
        //apply clean master
        newPage.appliedMaster = app.activeDocument.masterSpreads.lastItem();
    }
}


function createColophon_ad() {

    $.writeln("  0  ");

    // var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
    // var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());

    if (createColophon_Check.value) {
        //if (false) {

        $.writeln("  00  ");

        //get number os pages of the document
        var totalPages = app.activeDocument.pages.count();
        //retirar da conta as páginas da capa
        totalPages = totalPages - 2;

        //calculate the new number multiple of 2
        var idealPages = totalPages + (2 - (totalPages % 2));
        //get the number of pages that is needed to create
        var numPag_tocreate = idealPages - totalPages;

        //create pages


        if (totalPages % 2 == 0) {
            //var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
            var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
            var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
            var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
            //apply clean master
            // newPage.appliedMaster = app.activeDocument.masterSpreads.lastItem();
        } else {
            var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
            var newPage = app.activeDocument.pages.add(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
        }



        var colophon_textFrame = app.activeDocument.pages.lastItem().textFrames.add();

        colophon_textFrame.geometricBounds = [app.activeDocument.pages.firstItem().marginPreferences.top,
        app.activeDocument.pages.firstItem().marginPreferences.left,
        app.activeDocument.pages.firstItem().bounds[2] - app.activeDocument.pages.firstItem().marginPreferences.bottom,
        app.activeDocument.pages.firstItem().bounds[3] - app.activeDocument.pages.firstItem().marginPreferences.right]; //top, left, bottom, and right 

        // $.writeln("  1  ");

        // //var newPage = app.activeDocument.pages.lastItem().duplicate(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
        // //var newPage = app.activeDocument.pages.lastItem().duplicate(LocationOptions.AFTER, app.activeDocument.pages.lastItem());

        // var newPage = app.activeDocument.pages.lastItem().duplicate(LocationOptions.AFTER, app.activeDocument.pages.lastItem());
        // var newPage = app.activeDocument.pages.lastItem().duplicate(LocationOptions.AFTER, app.activeDocument.pages.lastItem());

        // $.writeln("  2  ");

        // //Designer

        var colophon = "Colophon \r\rPublica\u00E7\u00E3o gerada com o Sistema Scripted Pages."
            + "\rSistema desenvolvido por Diogo Ferreira \rno \u00E2mbito da disserta\u00E7\u00E3o de Mestrado \rem Design e Multim\u00E9dia "
            + "\rwww.scriptedpages.cdv.dei.uc.pt\r\rUniversidade de Coimbra \rSetembro 2019 "
            + "\rOrientado por \rArtur Rebelo \rS\u00E9rgio Rebelo "
            + "\r\r\rPropriedades do Documento"
            + "Largura: " + app.activeDocument.documentPreferences.pageWidth + "\rAltura: " + app.activeDocument.documentPreferences.pageHeight
            + "\rMargem superior: " + app.activeDocument.pages.firstItem().marginPreferences.top + " mm" + " \rMargem exterior: " + app.activeDocument.pages.firstItem().marginPreferences.left + " mm" + " \rMargem inferior: " + app.activeDocument.pages.firstItem().marginPreferences.bottom + " mm" + " \rMargem interior: " + app.activeDocument.pages.firstItem().marginPreferences.right + " mm"
            + "\rN\u00FAmero de colunas: " + numColumns
            + "\rGoteria: " + gutterSize + " mm"
            + "\r\rCriada a " + timeStamp();


        // $.writeln("  3  ");

        //colophon_textFrame.contents = colophon;

        app.activeDocument.pages.lastItem().textFrames[0].contents = colophon;

        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(textParagraphStyle_name);
        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(textParagraphStyle_name);
        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(textParagraphStyle_name);
        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().appliedFont = app.activeDocument.paragraphStyles.item(PS_of_Title).appliedFont.name;
        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().hyphenation = false;
        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.everyItem().firstLineIndent = 0;

        app.activeDocument.pages.lastItem().textFrames[0].paragraphs.firstItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);

        // $.writeln("  4  ");


        // var totalPages2 = app.activeDocument.pages.count();
        // //app.activeDocument.pages.item(totalPages2 - 1).textFrames.everyItem().remove();

    }

    //texframes[0].contents = "CENAS DO MAL";

}


function timeStamp() {
    // Get the time and format it  
    var digital = new Date();
    var hours = digital.getHours();
    var minutes = digital.getMinutes();
    var seconds = digital.getSeconds();
    var amOrPm = "AM";
    if (hours > 11) amOrPm = "PM";
    if (hours > 12) hours = hours - 12;
    if (hours == 0) hours = 12;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;

    // Get the date and format it  
    var date = new Date();
    var d = date.getDate();
    var day = (d < 10) ? '0' + d : d;
    var m = date.getMonth() + 1;
    var month = (m < 10) ? '0' + m : m;
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;

    // create a variable with the fully formatted the time and date  
    // todaysDate = hours + ":" + minutes + ":" + seconds + " " + amOrPm + " - " + day + "/" + month + "/" + year;  
    // todaysDate = hours + ":" + minutes + ":" + seconds + " " + amOrPm + " - " + month + "/" + day + "/" + year;  

    //MonthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    MonthNames = new Array("Janeiro", "Fevereiro", "Mar\u00E7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

    //todaysDate = hours + ":" + minutes + ":" + seconds + " " + amOrPm + " " + MonthNames[date.getMonth()] + " " + date.getDate() + ", " + year;
    todaysDate = date.getDate() + " de " + MonthNames[date.getMonth()] + " de " + year;

    return todaysDate;
}






function putTextAsBigAsPossible() {
    var actualSize = app.activeDocument.pages.item(1).textFrames[1].paragraphs.firstItem().pointSize;

    //for (var i = 0; i = true; i++) {
    for (var i = 0; i < 100; i++) {

        $.writeln(app.activeDocument.pages.item(1).textFrames[1].overflows);

        if (app.activeDocument.pages.item(1).textFrames[1].overflows == false) {
            app.activeDocument.pages.item(1).textFrames[1].paragraphs.everyItem().pointSize = actualSize + i + "pt";
        } else {
            app.activeDocument.pages.item(1).textFrames[1].paragraphs.everyItem().pointSize = actualSize + i - 2 + "pt";
            app.activeDocument.pages.item(1).textFrames[1].paragraphs.everyItem().leading = (actualSize + i - 2) * 1.05 + "pt";
            break;
        }
    }
    //$.writeln(app.activeDocument.pages.item(1).textFrames[1].overflows);
}





// "style0": ["LaNord_Antwerp", "Lyon Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "La Nord\tBold", "Bold", "35pt", "left"],
// "style1": ["LaNord_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "La Nord\tBold", "35pt", "left"],
// "style2": ["Helvetica_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Helvetica\tBold", "35pt", "left"],
// "style3": ["Scala_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Scala Sans (TT)\tBold", "35pt", "left"],
// "style4": ["GillSans_Baskerville", "Baskerville\tRegular", "10.5pt", 1.25, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
// "style5": ["GillSans_Perpetua", "Perpetua Std\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
// "style6": ["GillSans_Minion", "Minion Pro\tRegular", "10.5pt", 1.28, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
// "style7": ["Futura_Sabon", "Sabon LT Std\tRoman", "10.5pt", 1.28, "justified", "true", "  ", "Futura\tBold", "35pt", "left"],
// "style8": ["Univers_Sabon", "Sabon LT Std\tRoman", "10.5pt", 1.28, "justified", "true", "  ", "Univers LT Std\t65 Bold", "35pt", "left"],
// "style9": ["Scala_Scala", "Scala\tRegular", "10.5pt", 1.28, "justified", "true", "  ", "Scala Sans (TT)\tBold", "35pt", "left"],
// "style10": ["Helvetica_Joanna", "Joanna MT Std\tRegular", "10.5pt", 1.22, "justified", "true", "  ", "Helvetica\tBold", "35pt", "left"],
// "style11": ["BRRR_Fournier", "Joanna MT Std\tRegular", "10.5pt", 1.17, "justified", "true", "  ", "BRRR\tMedium", "35pt", "left"],
// "style12": ["Walsheim_Caslon", "Adobe Caslon Pro\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "GT Walsheim Pro\tBold", "35pt", "left"],
// "style13": ["ProximaNova_Arnhem", "Arnhem\tNormal", "10.5pt", 1.2, "justified", "true", "  ", "Proxima Nova\tBold", "35pt", "left"],
// "style14": ["Founders_Arnhem", "Arnhem\tNormal", "10.5pt", 1.17, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
// "style15": ["Founders_Domain", "Domaine Text\tRegular", "10.5pt", 1.17, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
// "style16": ["Neuzeit_Antwerp", "Antwerp\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Neuzeit Grotesk\tBold", "35pt", "left"],
// "style17": ["Founders_Tiempos", "Tiempos Text\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
// "style18": ["GillSans_Times", "Times New Roman\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
// "style19": ["nao ", "Antwerp\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Fugue Tails\tRegular", "35pt", "left"],
// "style20": ["nao ", "Antwerp\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "BRRR\tMedium", "35pt", "left"],
// "style21": ["nao", "Domaine Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "Domaine Text\tBold", "35pt", "left"],