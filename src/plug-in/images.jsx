function treat_Images() {

    var g = app.activeDocument.allGraphics;

    $.writeln(g.length + "   Number of images");


    for (var i = 0; i < g.length; i++) {

        var img_tst = g[i].parent.parent;

        //g[0].parent.verticalScale = 70;
        //g[0].parent.horizontalScale = 80;


        //$.writeln(g[0].geometricBounds + "   BBBB");
        //img_tst.appliedParagraphStyle = "Images";

        //var characterHoldingTheImage = g[0].parent.parent;
        //characterHoldingTheImage.insertionPoints[0].contents = "\r";


        var story = g[i].parent.parent.parentStory;

        var indexOfChar = g[i].parent.parent.index;
        var charBeforeContents = story.characters[indexOfChar - 1].contents;
        var charAfterContents = story.characters[indexOfChar + 1].contents;
        var charBeforeContents_2 = story.characters[indexOfChar - 2].contents;
        var charAfterContents_2 = story.characters[indexOfChar + 2].contents;


        // $.writeln("charBeforeContents  " + charBeforeContents);
        // $.writeln("charAfterContents  " + charAfterContents);
        // $.writeln("charBeforeContents_2  " + charBeforeContents_2);
        // $.writeln("charAfterContents_2  " + charAfterContents_2);


        //ADD PARAGRAPH BEFORE AND AFTER

        // if (charBeforeContents == "\r" && charBeforeContents_2 == "\r") {
        //     $.writeln("tem 2 antes");
        //     /*add paragraph character before*/
        //     //story.characters[indexOfChar - 1].contents = "\r";
        //     story.characters[indexOfChar - 1].remove();
        // };

        // if (charAfterContents == "\r" && charAfterContents_2 == "\r") {
        //     $.writeln("tem 2 depois");
        //     /*add paragraph character before*/
        //     //story.characters[indexOfChar - 1].contents = "\r";
        //     story.characters[indexOfChar + 1].remove();
        // };


        // if (charBeforeContents == "\r") {
        //     $.writeln("********");
        // };


        if (charBeforeContents != "\r") {
            $.writeln("nao tem antes");
            /*add paragraph character after*/
            story.characters[indexOfChar - 2].contents = "\r";

        };

        // if (charAfterContents != "\r") {
        //     $.writeln("nao tem depois");
        //     /*add paragraph character after*/
        //     story.characters[indexOfChar + 2].contents = "\r";

        // };



        story.characters[indexOfChar - 2].contents = "\r";


        //Agora que já tem nos dois, muda PS
        //img_tst.appliedParagraphStyle = "Images";
        img_tst.appliedParagraphStyle = "IMG";
    }

}



function images_wrap() {

    var images = app.activeDocument.allGraphics;

    $.writeln("images  " + images.length);

    for (var i = 0; i < images.length; i++) {

        images[i].parent.textWrapPreferences.textWrapMode = TextWrapModes.JUMP_OBJECT_TEXT_WRAP;
        images[i].parent.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;

        images[i].parent.textWrapPreferences.textWrapOffset = ["5mm", "0mm", "5mm", "0mm"];
    }

    $.writeln("images wrap");
}



// function parent2() {    //https://forums.adobe.com/message/11090830#11090830

//     var graphicsArray = app.activeDocument.allGraphics;

//     for (var n = 0; n < graphicsArray.length; n++) {
//         var currentGraphic = graphicsArray[n];
//         var currentGraphicContainerFrame = currentGraphic.parent;

//         /* 
//             The parent of currentGraphicContainerFrame could be several things: 

//             1. Spread > Not anchored, container frame is just on the spread 
//             2. Graphic Frame > container was added to a graphic frame with method add() 
//             3. Group > Pasted inside a graphic frame 

//             4. Character > Anchored frame 
//         */
//         var currentGraphicContainerFrameParent = currentGraphicContainerFrame.parent;

//         if (currentGraphicContainerFrameParent.constructor.name == "Character") {
//             // parentTextFrames is always an array. Even if it contains only one element:  
//             var textContainerName = currentGraphicContainerFrameParent.parentTextFrames[0].label;
//             //var textContainerName = currentGraphicContainerFrameParent.parentTextFrames[0].name;

//             $.writeln("image  " + n + "\t" + "textContainerName: " + textContainerName);
//         };
//     };
// }







function scaleImages_generativeAccordingToColumns() {

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

        // 2    Colocar imagem do tamanho da coluna
        //
        var gb = g[i].geometricBounds;

        // gb now holds [ top, left, bottom, right ] values -- get shorthand values  
        var top = gb[0];
        var left = gb[1];
        var bottom = gb[2];
        var right = gb[3];

        var width = Math.round(Math.abs(right - left) * 1000) / 1000;
        var height = Math.round(Math.abs(bottom - top) * 1000) / 1000;

        //Get new height
        var newHeight = (height * columnWidth) / width;
        //resize image
        g[i].parent.geometricBounds = [top, left, top + newHeight, left + columnWidth];
        //Fit image to frame
        g[i].parent.fit(FitOptions.CONTENT_TO_FRAME);
    }


    for (var i = 0; i < g.length; i++) {

        // fetch width and height for the numbers, left and bottom for the lines  
        var gb = g[i].geometricBounds;

        // gb now holds [ top, left, bottom, right ] values -- get shorthand values  
        var top = gb[0];
        var left = gb[1];
        var bottom = gb[2];
        var right = gb[3];

        var width = Math.round(Math.abs(right - left) * 1000) / 1000;
        var height = Math.round(Math.abs(bottom - top) * 1000) / 1000;


        // //ESTA REPETIDO COM O IF EM BAIXO, POSSO REMOVER
        // //
        // //Get new height
        // var newHeight = (height * columnWidth) / width;
        // //resize image
        // g[i].parent.geometricBounds = [top, left, top + newHeight, left + columnWidth];
        // //Fit image to frame
        // g[i].parent.fit(FitOptions.CONTENT_TO_FRAME);



        if (numColumns == 1) {      //se o numero de colunas for  maior que 1 as imagens podem ficar do tamanho de mais de uma coluna.
            $.writeln("NUM COLUNAS = 1");
        } else {
            $.writeln("NUM COLUNAS > 1");
            $.writeln("");

            var currentGraphic = g[i];
            var currentGraphicContainerFrame = currentGraphic.parent;
            //nome do textframe
            var currentGraphicContainerFrameParent = currentGraphicContainerFrame.parent;

            if (currentGraphicContainerFrameParent.constructor.name == "Character") {
                // parentTextFrames is always an array. Even if it contains only one element:  
                var textContainerName = currentGraphicContainerFrameParent.parentTextFrames[0].name;

                $.writeln("image  " + i);
                $.writeln("textContainerName: " + textContainerName);

                var columnWhereIsImage = textContainerName.split("_", 2);
                columnWhereIsImage = parseInt(columnWhereIsImage[1]);
                columnWhereIsImage++;

                //$.writeln(textContainerName.substring(0, textContainerName.indexOf("_")));
                $.writeln("esta na coluna   " + columnWhereIsImage);

                //get page number of specific image
                var imgPageNum = parseInt(currentGraphic.parentPage.name);
                $.writeln("esta na pagina ---->   " + imgPageNum);
            };


            $.writeln("columnWhereIsImage  " + columnWhereIsImage);


            if (columnWhereIsImage == numColumns) { //se está na última coluna da página, fica sempre do tamanho da coluna
                $.writeln("imagem esta na ultima coluna da pagina");
            } else {
                $.writeln("imagem NAO esta na ultima coluna da pagina");

                //rigth pages
                //
                //if (imgPageNum % 2 == 0) { 

                //—————————————— aqui vai ser + cenas em vez de só o numero de colunas

                //até que coluna vai ocupar
                var untilColumn_imgWillOcuppy = Math.floor(Math.random() * (numColumns - columnWhereIsImage + 1)) + columnWhereIsImage;

                //quantas colunas vai ocupar
                var nrColumns_imgWillOcuppy = untilColumn_imgWillOcuppy++;

                $.writeln(nrColumns_imgWillOcuppy + "    nrColumns_imgWillOcuppy");

                //adicionar o valor da guteira
                var newRandomWidth = (columnWidth * nrColumns_imgWillOcuppy) + (gutterSize * (nrColumns_imgWillOcuppy - 1));

                //calculate new Height acoording to new random width
                var newCalculatedHeight = (height * newRandomWidth) / width;


                var dist_fromTopPage_to_bottomImage = top + newCalculatedHeight;


                // Verificar se imagem pode ser redimensionada
                //
                if (dist_fromTopPage_to_bottomImage < (docHeight - bottomMargin)) {
                    $.writeln("imagem pode ser redimensionada");
                    //resize image
                    g[i].parent.geometricBounds = [top, left, top + newCalculatedHeight, left + newRandomWidth];

                    //Fit image to frame
                    g[i].parent.fit(FitOptions.CONTENT_TO_FRAME);
                } else {
                    $.writeln("imagem iria sair fora!!!!!!!");
                }



                // } else {    //left pages

                // }


                //app.activeDocument.pages.item(pageNum)
            }



        }

    }
}
