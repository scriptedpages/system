var analyseWord_textFrame;


function importWordDocument() {
    var script_file = File($.fileName); // get the location of the script file
    var script_file_path = script_file.path; // get the path

    //var wordDocument = File.openDialog("Choose a word file", undefined, true);

    //var wordDocument = File(script_file_path + "/The Masque of the Red Death.docx");
    var wordDocument = File(script_file_path + "/The Masque of the Red Death img.docx", undefined, true);


    wordDocument = userWordDocument;




    //https://graphicdesign.stackexchange.com/questions/48739/add-text-to-indesign-with-script
    //
    //read in the file line per line
    //    var lines = [];
    //    wordDocument.open('r');
    //    while (!wordDocument.eof) {
    //        lines[lines.length] = wordDocument.readln();
    //    }
    //    // always close files
    //    wordDocument.close();

    //$.writeln(String(lines[1]));

    //PLACE
    //
    if ((wordDocument != "") && (wordDocument != null)) {
        //        var pag = app.documents.item(0);
        //        var tetf = pag.textFrames.add();
        //        tetf.geometricBounds = [0, 0, 100, 100]; //top, left, bottom, and right 
        //        //tetf.place(wordDocument, true); //place file and show import otions
        //        tetf.place(wordDocument); //place file
        //        //tetf.insertionPoints.item(-1).place(wordDocument);


        //Place according to columns
        switch (numColumns) {
            case 1:
                var firstTextFrame = myDocument.pages.firstItem().textFrames.itemByName("right");
                break;
            default:
                var firstTextFrame = myDocument.pages.firstItem().textFrames.itemByName("firstRight_0");
                break;
        }

        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; //Disable user interaction to ignore missing fonts dialog
        //firstTextFrame.place(wordDocument, true);
        firstTextFrame.place(wordDocument);
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL; //Reable interaction


        //se importou word + pasta de imagens
        if (importWordImagesCheck.value) {
            $.writeln("importou word + pasta de images");

            if (imagesFolder != null) { //se a pasta das imagens não é null
                $.writeln("pasta de images e valida");
                placeImages();
            }

        }



    }
}



function importUserWordDocument() {

    function filterFiles(userWordDocument) {

        var originalName = userWordDocument.name;

        if (userWordDocument.name.match(/\.docx$/) || originalName.indexOf('.') == -1) {
            return true;
        } else {
            return false;
        }
    }


    //Display a standard open file dialog box to select a file.
    userWordDocument = File.openDialog("Choose a Word (.docx) file", filterFiles);



    if (importOnlyWordCheck.value) { //Se importar apenas o word
        if (userWordDocument != null) {
            wordDocumentPathStatic.text = "Chossen document:  " + userWordDocument;

            //1. analisar word document
            // $.writeln(" -- ");
            // $.writeln("analiseWordDocument");
            analiseWordDocument();
            // $.writeln(" ");

            //2. definir paragraph styles do word para o mapping
            // $.writeln(" -- ");
            // $.writeln("addWordDocumentStyles_toDropdown");
            addWordDocumentStyles_toDropdown();
            // $.writeln(" done ");
            // $.writeln(" ");

            //3. ativar o tab do mapping styles
            mapStylesTab.enabled = true;


            //Update UI do mapStylesTab
            keepStylesCheck_updateCorrespondingUI();
            mapStylesCheck_updateCorrespondingUI();
            generativeStylesCheck_updateCorrespondingUI();

            createButton.enabled = true;
        }
        else {
            wordDocumentPathStatic.text = "Chossen document: None";
        }
    } else {   //se se importar o word e as imagens
        if (userWordDocument != null) {
            wordDocumentPathStatic2.text = "Chossen document:  " + userWordDocument;

            //1. analisar word document
            // $.writeln(" -- ");
            // $.writeln("analiseWordDocument");
            analiseWordDocument();
            // $.writeln(" done ");
            // $.writeln(" ");

            //2. definir paragraph styles do word para o mapping
            // $.writeln(" -- ");
            // $.writeln("addWordDocumentStyles_toDropdown");
            addWordDocumentStyles_toDropdown();
            // $.writeln(" done ");
            // $.writeln(" ");

            //3. ativar o tab do mapping styles
            mapStylesTab.enabled = true;

            //Update UI do mapStylesTab
            keepStylesCheck_updateCorrespondingUI();
            mapStylesCheck_updateCorrespondingUI();
            generativeStylesCheck_updateCorrespondingUI();

            createButton.enabled = true;
        }
        else {
            wordDocumentPathStatic2.text = "Chossen document: None";
        }

    }


    //If a text file was selected, and if you didn't press Cancel,

    // if ((userJsonFile != "") && (userJsonFile != null)) {
    //     $.writeln("tem ficheiro");
    // } else {
    //     $.writeln("nao tem ficheiro");
    // }
}

var ImagesFiles;

function importImagesFolder() {

    var files;
    imagesFolder = Folder.selectDialog("Select a folder");
    if (imagesFolder != null) {
        //dizer qual é a pasta que foi escolhida
        wordImagesPathStatic.text = "Chossen folder:  " + imagesFolder;


        files = GetFiles(imagesFolder);
        if (files.length > 0) {
            // alert("Found " + files.length + " InDesign documents");
            // alert("0      " + files[0]);
        }
        else {
            alert("Found no images");
        }
    } else {
        wordImagesPathStatic.text = "Chossen folder: None";
    }

    function GetFiles(theFolder) {
        ImagesFiles = [],
            fileList = theFolder.getFiles(),
            i, file;

        for (i = 0; i < fileList.length; i++) {
            file = fileList[i];
            // if (file instanceof Folder) {
            //     files = files.concat(GetFiles(file));
            // }

            //if (file instanceof File && file.name.match(/\.png$/i) || file instanceof File && file.name.match(/\.jpg$/i)) {
            if (file instanceof File && file.name.match(/\.DS_Store$/i)) { } // se for a ds store não adiciona
            else {
                ImagesFiles.push(file);
            }
        }
        return ImagesFiles;
    }



    //placeImages();



}

//based on
//http://kasyan.ho.com.ua/indesign/image/place_inline_images.html
function placeImages() {
    var doc = app.activeDocument;

    $.writeln("  P     1");

    if (imagesFolder != null) {
        app.findObjectPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        app.findGrepPreferences.findWhat = "@.+?@";
        f = doc.findGrep(true);

        app.findObjectPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;

        imagesArray = ImagesFiles;

        // $.writeln(" ");
        // $.writeln("encontrou " + f.length + " imagens");

        for (i = 0; i < f.length; i++) {
            name = f[i].contents.replace(/@/g, "");


            //imagem com #
            if (name.indexOf('#') > -1) {
                //choose random index
                var randomImageIndex = Math.floor(Math.random() * imagesArray.length);
                //select random image
                var getRandomImage = imagesArray[randomImageIndex];
                //create image
                file = new File(getRandomImage);

                //remove used value from array
                imagesArray.splice(randomImageIndex, 1);

                if (file.exists) {
                    f[i].insertionPoints[0].place(file);
                    f[i].remove();
                }
            } else { //coloca imagens com o nome que esta identificado
                name = f[i].contents.replace(/@/g, "");
                file = new File(imagesFolder.fsName + "/" + name);

                if (file.exists) {
                    f[i].insertionPoints[0].place(file);
                    f[i].remove();
                }
            }

        }


        //Colocar imagens pequenas!!

        var g = app.activeDocument.allGraphics;

        $.writeln("g " + g);
        $.writeln("g.length " + g.length);

        //scale all images to fit into its text frame
        for (var i = 0; i < g.length; i++) {

            // 1    Colocar imagem super pequena
            //
            g[i].parent.absoluteVerticalScale = 0.1;
            g[i].parent.absoluteHorizontalScale = 0.1;
            g[i].parent.fit(FitOptions.FRAME_TO_CONTENT);
        }



    }
}



function analiseWordDocument() {
    //remove all existing paragraph styles

    //create a text frame on the existing document
    analyseWord_textFrame = app.activeDocument.pages.item(0).textFrames.add();
    analyseWord_textFrame.geometricBounds = [0, 0, 5, 5];

    //Place the base document to analise
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; //Disable user interaction to ignore missing fonts dialog
    analyseWord_textFrame.place(userWordDocument);
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL; //Reable interaction

    document_Words = analyseWord_textFrame.parentStory.words.length;    //numbers of words of the imported document
    document_Images = analyseWord_textFrame.parentStory.allGraphics.length; //number of images on the imported document
    var document_paragraphs = analyseWord_textFrame.parentStory.paragraphs.length; //number of images on the imported document


    number_documentPages = parseInt((document_Words / 270) * 4);

    $.writeln("document_Words : " + document_Words);
    $.writeln(document_paragraphs + " document_paragraphs");
    $.writeln(number_documentPages + " number_documentPages");


    if (number_documentPages >= 300) {
        number_documentPages = 300;
    }

    $.writeln(number_documentPages + " number_documentPages");


    //$.writeln("document_Images : " + document_Images);
}




function addWordDocumentStyles_toDropdown() {
    var allParaStyles = app.activeDocument.allParagraphStyles;
    var PSNames = [];

    for (var i = 0; i < allParaStyles.length; i++) {
        if (i > 1) {
            //var curStyle = allParaStyles[i];

            //PSNames.push(allParaStyles[i].name);
            wordStyles_Dropdown.add('item', allParaStyles[i].name);
        }
    }

    //Select the first paragraph style by default
    wordStyles_Dropdown.selection = 0;
}