// PS que estão entre o texto e os títulos
var stylesToMap_fromText_Title;
var styles_to_use = [];



function load_and_Update_ParagraphStyles() {
    $.writeln("sim");

    var allParaStyles = app.activeDocument.allParagraphStyles;
    var PSNames = [];


    for (var i = 0; i < allParaStyles.length; i++) {
        // if (i > 1) {
        //     var curStyle = allParaStyles[i];

        //     PSNames.push(allParaStyles[i].name);
        // }


        for (var k = 0; k < mapPSList.items.length; k++) {
            //usage.push(mapPSList.items[i].subItems[0].text);
            //mapPSList.items[k].text;
            if (allParaStyles[i].name == mapPSList.items[k].text) {
                $.writeln(" O PS - " + allParaStyles[i].name + "  - foi redefinido");

                var newParagraphStyle = app.activeDocument.paragraphStyles.item(allParaStyles[i].name);

                try {
                    var myName = newParagraphStyle.name;
                } catch (myError) {

                    newParagraphStyle = app.activeDocument.paragraphStyles.add({
                        name: allParaStyles[i].name
                    });
                }


                switch (mapPSList.items[k].subItems[0].text) {
                    case "Random":
                        $.writeln("redefinido para random");

                        var allFonts = app.fonts.everyItem().getElements();
                        //apply a random font
                        newParagraphStyle.appliedFont = allFonts[Math.floor(Math.random() * allFonts.length)];

                        break;

                    case "New Paragraph Style":

                        $.writeln("New PS");
                        break;

                    default:

                        newParagraphStyle.appliedFont = mapPSList.items[k].subItems[0].text.split(' - ')[0];
                        newParagraphStyle.fontStyle = mapPSList.items[k].subItems[0].text.split(' - ')[1];
                }


            }
        }
    }
}





function mapAllStyles_allPossibilities() {

    // $.writeln("keepStylesCheck.value  " + keepStylesCheck.value);
    // $.writeln("generativeStylesCheck.value  " + generativeStylesCheck.value);
    // $.writeln("mapStylesCheck.value  " + mapStylesCheck.value);


    if (keepStylesCheck.value) { // DO NOTHING
        //não vai fazer nada porque é para manter
        $.writeln("MANTEM ");

        //1. vai buscar o PS mais usado
        var textParagraphStyle = get_mostUsed_ParagraphStyle();
        $.writeln("textParagraphStyle  " + textParagraphStyle);

        //2. Vai buscar fonte de títulos
        var titleParagraphStyle = get_title_ParagraphStyle();
        $.writeln("titleParagraphStyle  " + titleParagraphStyle);

        //3. vai buscar a sua entrelinha e define a entrelinha do documento para essa
        var pointSize = app.activeDocument.paragraphStyles.item(textParagraphStyle).pointSize;
        $.writeln(pointSize);
        baseline = pointSize * 1.2 + "pt";

        //4. Criar PS para ser usado nas sections
        create_Section_PS(titleParagraphStyle, textParagraphStyle, pointSize);
        $.writeln("Created!!");

        //Definir as variaveis do nome do PS do texto e title para serem usadas na capa e  contracapa
        PS_of_Title = titleParagraphStyle;
        textParagraphStyle_name = textParagraphStyle;
    }


    if (mapStylesCheck.value) { //  MAP STYLES
        $.writeln("obedece ");

        //0. Faz as alterações necessárias
        mapStyles_accordingTo_mapStylesTab(); //map styles


        //1. Vai buscar PS do texto
        var textParagraphStyle = get_mostUsed_ParagraphStyle();
        $.writeln("textParagraphStyle  " + textParagraphStyle);

        //2. Vai buscar fonte de títulos
        var titleParagraphStyle = get_title_ParagraphStyle();
        $.writeln("titleParagraphStyle  " + titleParagraphStyle);

        //3. vai buscar a sua entrelinha e define a entrelinha do documento para essa
        var pointSize = app.activeDocument.paragraphStyles.item(textParagraphStyle).pointSize;
        baseline = pointSize * 1.15 + "pt";


        //4. Criar PS para ser usado nas sections
        create_Section_PS(titleParagraphStyle, textParagraphStyle, pointSize);
        $.writeln("Created!!");

        //Definir as variaveis do nome do PS do texto e title para serem usadas na capa e  contracapa
        PS_of_Title = titleParagraphStyle;
        textParagraphStyle_name = textParagraphStyle;
    }



    if (generativeStylesCheck.value) {
        $.writeln("cria ");

        //1. Vai buscar PS do texto
        var textParagraphStyle = get_mostUsed_ParagraphStyle();
        $.writeln("textParagraphStyle  " + textParagraphStyle);


        //2. Vai buscar fonte de títulos
        var titleParagraphStyle = get_title_ParagraphStyle();
        $.writeln("titleParagraphStyle  " + titleParagraphStyle);

        //Para ser usado no GREP
        PS_of_Title = titleParagraphStyle + " PS";

        //3. Criar novo PS para o titulo com o conhecimento do sistema
        //var titlePS = app.activeDocument.paragraphStyles.item(titleParagraphStyle);
        //escolha da fonte de acordo com o conhecimento do sistema



        if (document_Words > longDocument_words) { //se for livro de leitura longa
            var randomParagraphStyle = Math.floor(Math.random() * (paragraphStyles_knowledge.length - 1));
            styles_to_use = paragraphStyles_knowledge;
        } else {
            var randomParagraphStyle = Math.floor(Math.random() * (paragraphStyles_knowledge_short.length - 1));
            styles_to_use = paragraphStyles_knowledge_short;
            $.writeln("SHORT");
        }


        //save choosen random PS
        //diogo
        //save_choosenStyle = styles_to_use[randomParagraphStyle];
        save_choosenStyle = randomParagraphStyle;

        $.writeln("iii    0");

        //Criar novo PS para o titulo para depois substituir
        try {
            app.activeDocument.paragraphStyles.item(titleParagraphStyle + " PS").name;
        } catch (myError) {

            var titlePS = app.activeDocument.paragraphStyles.add({
                name: titleParagraphStyle + " PS"
            });
        }




        //DECIDIR O TAMANHO DA FONTE DE TITULOS

        $.writeln(choosenTitleSize + "    ?????");

        if (choosenTitleSize != false) {
            $.writeln("  ");
            var titleFontSize_accordingToSize = choosenTitleSize;
        } else {
            $.writeln("ou aqui ");
            //se for um tamanho pequeno
            if (docWidth <= pequenos_tam) {
                var minTitle_FontSize = pequenos_fonte_title[0];
                var maxTitle_FontSize = pequenos_fonte_title[pequenos_fonte_title.length - 1];
                var titleFontSize_accordingToSize = Math.floor(Math.random() * (maxTitle_FontSize - minTitle_FontSize + 1)) + minTitle_FontSize;

            } else if (docWidth <= medios_tam) { //Se for um tamanho médio
                var minTitle_FontSize = medios_fonte_title[0];
                var maxTitle_FontSize = medios_fonte_title[medios_fonte_title.length - 1];
                var titleFontSize_accordingToSize = Math.floor(Math.random() * (maxTitle_FontSize - minTitle_FontSize + 1)) + minTitle_FontSize;

            } else { //se for dos grandes
                var minTitle_FontSize = grandes_fonte_title[0];
                var maxTitle_FontSize = grandes_fonte_title[grandes_fonte_title.length - 1];
                var titleFontSize_accordingToSize = Math.floor(Math.random() * (maxTitle_FontSize - minTitle_FontSize + 1)) + minTitle_FontSize;
            }
        }

        $.writeln(titleFontSize_accordingToSize + "    titleFontSize_accordingToSize");
        $.writeln(randomParagraphStyle + "    randomParagraphStyle");

        //Save sizes to save json file
        save_titleSize = titleFontSize_accordingToSize;



        titlePS.pointSize = titleFontSize_accordingToSize + "pt";
        //titlePS.pointSize = styles_to_use[randomParagraphStyle].titlePointSize;

        titlePS.alignToBaseline = true;
        titlePS.gridAlignFirstLineOnly = true;
        titlePS.leading = (titleFontSize_accordingToSize * 1.1) + "pt";

        titlePS.hyphenation = true;

        //titlePS.appliedFont = styles_to_use[randomParagraphStyle].titleAppliedFont;


        try {
            titlePS.appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;
        } catch (myError) {
            //titlePS.appliedFont = "Minion Pro\tBold";
            try {
                titlePS.appliedFont = "Minion Pro\tBold";
            } catch (myError) {
                titlePS.appliedFont = "Minion Pro\tRegular";
            }
        }
        //titlePS.appliedFont = styles_to_use[randomParagraphStyle].titleAppliedFont;

        //titlePS.fontStyle = styles_to_use[randomParagraphStyle].titleFontStyle;
        titlePS.spaceAfter = 0;
        titlePS.spaceBefore = 0;

        //Justification
        switch (styles_to_use[randomParagraphStyle].titleJustification) {
            case "left":
                titlePS.justification = Justification.LEFT_ALIGN;
                break;
            case "center":
                titlePS.justification = Justification.CENTER_ALIGN;
                break;
            case "justified":
                titlePS.justification = Justification.LEFT_JUSTIFIED;
                break;
            default:
                titlePS.justification = Justification.LEFT_ALIGN;
        }




        // 5. Criar novo PS para o texto com o conhecimento do sistema
        var textPointSize = create_text_ParagraphStyle(textParagraphStyle, titleParagraphStyle, randomParagraphStyle);


        // 6. Criar todos os PS Intermédios entre o texto e os títulos
        //var titlePointSize = parseInt(styles_to_use[randomParagraphStyle].titlePointSize);
        var titlePointSize = titleFontSize_accordingToSize;
        //var textPointSize = parseInt(styles_to_use[randomParagraphStyle].textPointSize);

        $.writeln(" titlePointSize  " + titlePointSize);
        $.writeln(" textPointSize  " + textPointSize);

        create_PSbetween_Text_andTitle(randomParagraphStyle, textParagraphStyle, titleParagraphStyle, titlePointSize, textPointSize);

        //4. Atualizar os PS restantes para o conhecimento do sistema
        //update_others_ParagraphStyle(titleParagraphStyle, randomParagraphStyle);

        //5. Criar PS para ser usado nas sections
        create_Section_PS(titleParagraphStyle + " PS", textParagraphStyle + " PS", textPointSize);



        var newbaseline = textPointSize * styles_to_use[randomParagraphStyle].textLeading;
        baseline = newbaseline + " pt";
    }
}



function mapStyles_accordingTo_mapStylesTab() {

    var allParaStyles = app.activeDocument.allParagraphStyles;
    var PSNames = [];


    for (var i = 0; i < allParaStyles.length; i++) {

        //correr lista
        for (var k = 0; k < mapPSList.items.length; k++) {
            //usage.push(mapPSList.items[i].subItems[0].text);
            //mapPSList.items[k].text;
            if (allParaStyles[i].name == mapPSList.items[k].text) {
                $.writeln(" O PS - " + allParaStyles[i].name + "  - foi redefinido");

                var newParagraphStyle = app.activeDocument.paragraphStyles.item(allParaStyles[i].name);

                try {
                    var myName = newParagraphStyle.name;
                } catch (myError) {

                    newParagraphStyle = app.activeDocument.paragraphStyles.add({
                        name: allParaStyles[i].name
                    });
                }


                switch (mapPSList.items[k].subItems[0].text) {
                    case "Random":
                        $.writeln("redefinido para random");

                        var allFonts = app.fonts.everyItem().getElements();
                        //apply a random font
                        newParagraphStyle.appliedFont = allFonts[Math.floor(Math.random() * allFonts.length)];

                        break;

                    case "New Paragraph Style":

                        $.writeln("New PS");
                        break;

                    default:

                        newParagraphStyle.appliedFont = mapPSList.items[k].subItems[0].text.split(' - ')[0];
                        newParagraphStyle.fontStyle = mapPSList.items[k].subItems[0].text.split(' - ')[1];
                }


            }
        }
    }
}


// get text paragraph style
function get_mostUsed_ParagraphStyle() {
    // var allParaStyles = app.activeDocument.allParagraphStyles;
    // var maxWords = 0;
    // var mostUsedStyle;

    // for (var i = 2; i < allParaStyles.length; i++) {

    //     var curStyle = allParaStyles[i].name;

    //     app.findGrepPreferences = NothingEnum.nothing;

    //     //Set the find options. 
    //     var finds = app.findGrepPreferences.findWhat = "\\b\\w+?\\b"; //\\b\\w+?\\b
    //     app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(curStyle);

    //     try {
    //         finds = app.activeDocument.findGrep();
    //     } catch (myError) { }
    //     app.findGrepPreferences = NothingEnum.nothing;

    //     if (finds.length > 0) {
    //         var numberOfWords = finds.length;

    //         if (numberOfWords >= maxWords) { //se o estilo atual é mais usado, guarda-o
    //             maxWords = numberOfWords;
    //             mostUsedStyle = curStyle;
    //         }
    //     }
    //     $.writeln("This document has " + finds.length + " words with PS= " + curStyle);
    // }


    var allParaStyles = app.activeDocument.allParagraphStyles;
    var maxNumberofPS = 0;
    var mostUsedStyle;

    for (var i = 2; i < allParaStyles.length; i++) {

        var curStyle = allParaStyles[i].name;

        app.findGrepPreferences = NothingEnum.nothing;
        app.findGrepPreferences.appliedParagraphStyle = curStyle;

        try {
            finds = app.activeDocument.findGrep();
        } catch (myError) { }

        app.findGrepPreferences = NothingEnum.nothing;

        if (finds.length > 0) {
            var numberOfPS = finds.length;
            var numeroDeCaracteresDestePS = 0;

            $.writeln("- - - - - - - - - - - - - -- - - - -- - - - - -- - - -- -");

            for (var k = 0; k < finds.length; k++) {
                numeroDeCaracteresDestePS = numeroDeCaracteresDestePS + finds[k].contents.length;
                //$.writeln(finds[k].contents);
                //$.writeln(finds[k].contents.length);
                //$.writeln(finds[k] + "   tipo     " + typeof (finds[k]));
            }

            $.writeln("- - - - - - - - - - - - - -- - - - -- - - - - -- - - -- -");


            if (numeroDeCaracteresDestePS >= maxNumberofPS) { //se o estilo atual é mais usado, guarda-o
                maxNumberofPS = numeroDeCaracteresDestePS;
                mostUsedStyle = curStyle;
            }
        }

        //$.writeln("This document has " + finds.length + " with the style -  " + allParaStyles[i].name);
        $.writeln("This document has " + numeroDeCaracteresDestePS + " WORDS with the style -  " + allParaStyles[i].name);
    }


    $.writeln("mostUsedStyle  " + mostUsedStyle);
    return mostUsedStyle;
}


// get title paragraph style
function get_title_ParagraphStyle() {

    var allParaStyles = app.activeDocument.allParagraphStyles;
    var biggestFontSize = 0;
    var biggestFontSizeStyle;


    for (var i = 0; i < allParaStyles.length; i++) {
        //$.writeln("O PS " + allParaStyles[i].name + " e composto a " + allParaStyles[i].pointSize);

        //guardar o PS com tamanho de fonte maior
        if (allParaStyles[i].pointSize >= biggestFontSize) {
            biggestFontSize = allParaStyles[i].pointSize;
            biggestFontSizeStyle = allParaStyles[i].name;
        }
    }

    return biggestFontSizeStyle;
}


// //update all Ps except title one
// function update_others_ParagraphStyle(titleParagraphStyle, randomParagraphStyle) {
//     var allParaStyles = app.activeDocument.allParagraphStyles;

//     //i = 2 porque o primeiro não existe e o seguyndo é o basico
//     for (var i = 2; i < allParaStyles.length; i++) {


//         if (allParaStyles[i].name != titleParagraphStyle) {
//             $.writeln("allParaStyles[i].name " + allParaStyles[i].name);
//             $.writeln("titleParagraphStyle " + titleParagraphStyle);

//             //1. Passa à fonte do texto e tamanho do texto
//             allParaStyles[i].pointSize = styles_to_use[randomParagraphStyle].textPointSize;

//             allParaStyles[i].appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;
//             allParaStyles[i].fontStyle = styles_to_use[randomParagraphStyle].textFontStyle;


//             allParaStyles[i].gridAlignFirstLineOnly = false;

//             //leading
//             allParaStyles[i].alignToBaseline = true;
//             allParaStyles[i].leading = styles_to_use[randomParagraphStyle].textLeading;

//             allParaStyles[i].fillColor = "Black";


//             // $.writeln(styles_to_use[randomParagraphStyle].justification);
//             // $.writeln(styles_to_use[randomParagraphStyle].hyphenation);

//             //Justification
//             switch (styles_to_use[randomParagraphStyle].justification) {
//                 case "left":
//                     allParaStyles[i].justification = Justification.LEFT_ALIGN;
//                     $.writeln("left");
//                     break;
//                 case "center":
//                     allParaStyles[i].justification = Justification.CENTER_ALIGN;
//                     break;
//                 case "justified":
//                     allParaStyles[i].justification = Justification.LEFT_JUSTIFIED;
//                     $.writeln("justified");
//                     break;
//                 default:
//                     allParaStyles[i].justification = Justification.LEFT_ALIGN;
//             }

//             //Hifenização
//             switch (styles_to_use[randomParagraphStyle].hyphenation) {
//                 case "true":
//                     allParaStyles[i].hyphenation = true;
//                     $.writeln("true");
//                     break;
//                 default:
//                     allParaStyles[i].hyphenation = false;
//             }
//         }
//     }

//     baseline = parseFloat(styles_to_use[randomParagraphStyle].textLeading);
//     baseline = baseline + "pt";
// }



//create new text paragraph style
function create_text_ParagraphStyle(textParagraphStyle, titleParagraphStyle, randomParagraphStyle) {

    //saber quais são os PS iguais ao do texto, ou seja, com a mesma fonte e mesmo tamanho

    var allPS = app.activeDocument.paragraphStyles;

    stylesToMap_fromText_Title = [];
    var stylesIdentic_toText = [];


    for (var ps = 2; ps < allPS.length; ps++) {
        //verificar se o PS analisado é na mesma fonte do texto e não comparar com o PS do texto
        //
        //1. Ver quais o PS que são iguais em tamanho e fonte ao texto
        if (allPS[ps].pointSize == app.activeDocument.paragraphStyles.item(textParagraphStyle).pointSize && allPS[ps].name != textParagraphStyle) {
            $.writeln(" O PS  " + allPS[ps].name + " tem o mesmo tamanho da donte que o " + app.activeDocument.paragraphStyles.item(textParagraphStyle).name);

            stylesIdentic_toText.push(allPS[ps].name);
        }
        else {
            //2. Guardar todos os que não são iguais, nome e tamanho da fonte - excepto fonte PS título
            //
            // não é o do texto && não é o do titulo && não é o já criado para o título
            if (allPS[ps].name != textParagraphStyle && allPS[ps].name != titleParagraphStyle && allPS[ps].name != titleParagraphStyle + " PS") {
                $.writeln("O PS  " + allPS[ps].name + " e diferente do texto e do título");

                var temp = {
                    "name": allPS[ps].name,
                    "pointSize": allPS[ps].pointSize
                };

                //stylesToMap_fromText_Title.push(allPS[ps].name);
                stylesToMap_fromText_Title.push(temp);
            }
        }
    }

    // $.writeln("ANTES");

    // for (var i = 0; i < stylesToMap_fromText_Title.length; i++) {
    //     $.writeln(stylesToMap_fromText_Title[i].name);
    //     $.writeln(stylesToMap_fromText_Title[i].pointSize);
    // }

    //ordenar os paragraph styles entre o texto e os títulos
    function compareIndexFound(obj1, obj2) {
        return obj1.h - obj2.h;
    }

    //stylesToMap_fromText_Title.sort(compareIndexFound).reverse();
    stylesToMap_fromText_Title.sort(compareIndexFound);




    //  3. Criar novo PS para o texto
    //
    //  Criar novo PS para o texto para depois substituir
    try {
        app.activeDocument.paragraphStyles.item(textParagraphStyle + " PS").name;
    } catch (myError) {

        textParagraphStyle = app.activeDocument.paragraphStyles.add({
            name: textParagraphStyle + " PS"
        });
    }


    //1. Escolhe um tamanho da fonte consoante as regras de tamanho

    //se for um tamanho pequeno
    if (choosenTextSize != false) {
        var textFontSize_accordingToSize = choosenTextSize;
    } else {
        if (docWidth <= pequenos_tam) {
            var minText_FontSize = pequenos_fonte_text[0];
            var maxText_FontSize = pequenos_fonte_text[pequenos_fonte_text.length - 1];
            var textFontSize_accordingToSize = Math.floor(Math.random() * (maxText_FontSize - minText_FontSize + 1)) + minText_FontSize;

        } else if (docWidth <= medios_tam) { //Se for um tamanho médio
            var minText_FontSize = medios_fonte_text[0];
            var maxText_FontSize = medios_fonte_text[medios_fonte_text.length - 1];
            var textFontSize_accordingToSize = Math.floor(Math.random() * (maxText_FontSize - minText_FontSize + 1)) + minText_FontSize;

        } else { //se for dos grandes
            var minText_FontSize = grandes_fonte_text[0];
            var maxText_FontSize = grandes_fonte_text[grandes_fonte_text.length - 1];
            var textFontSize_accordingToSize = Math.floor(Math.random() * (maxText_FontSize - minText_FontSize + 1)) + minText_FontSize;


        }
    }
    $.writeln(textFontSize_accordingToSize + "    textFontSize_accordingToSize");

    //save text font size to save json rules
    save_textSize = textFontSize_accordingToSize;


    //Aplica o tamanho da fonte que foi escolhido
    textParagraphStyle.pointSize = textFontSize_accordingToSize + "pt";
    //textParagraphStyle.pointSize = styles_to_use[randomParagraphStyle].textPointSize;


    //$.writeln("    passsa  1");
    //$.writeln("    styles_to_use[randomParagraphStyle].textAppliedFont " + styles_to_use[randomParagraphStyle].textAppliedFont);

    $.writeln("    passsa  0 -----");

    try {
        textParagraphStyle.appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;
    } catch (myError) {
        textParagraphStyle.appliedFont = "Minion Pro\tRegular";
    }

    $.writeln("    passsa  100 ------");

    //textParagraphStyle.appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;



    //leading
    textParagraphStyle.alignToBaseline = true;


    textParagraphStyle.leading = (textFontSize_accordingToSize * styles_to_use[randomParagraphStyle].textLeading) + "pt";
    textParagraphStyle.fillColor = "Black";


    textParagraphStyle.minimumWordSpacing = 80;
    textParagraphStyle.desiredWordSpacing = 100;
    textParagraphStyle.maximumWordSpacing = 120;

    //Others
    textParagraphStyle.spaceAfter = 0;
    textParagraphStyle.spaceBefore = 0;
    textParagraphStyle.leftIndent = 0;
    textParagraphStyle.firstLineIndent = textFontSize_accordingToSize + "pt";


    //Justification
    switch (styles_to_use[randomParagraphStyle].justification) {
        case "left":
            textParagraphStyle.justification = Justification.LEFT_ALIGN;
            $.writeln("left");
            break;
        case "center":
            textParagraphStyle.justification = Justification.CENTER_ALIGN;
            break;
        case "justified":
            textParagraphStyle.justification = Justification.LEFT_JUSTIFIED;
            $.writeln("justified");
            break;
        default:
            textParagraphStyle.justification = Justification.LEFT_ALIGN;
    }

    //Hifenização
    switch (styles_to_use[randomParagraphStyle].hyphenation) {
        case "true":
            textParagraphStyle.hyphenation = true;
            $.writeln("true");
            break;
        default:
            textParagraphStyle.hyphenation = false;
    }


    textParagraphStyle_name = textParagraphStyle.name;

    // ————————————————————————————————————————————————————————————————————————
    // ————————————————————————————————————————————————————————————————————————
    // ————————————————————————————————————————————————————————————————————————
    //4. Criar novos PS para os que são identicos ao texto

    for (var ps = 0; ps < stylesIdentic_toText.length; ps++) {

        $.writeln("stylesIdentic_toText[ps] " + stylesIdentic_toText[ps]);

        var thisPSName = stylesIdentic_toText[ps];

        try {
            app.activeDocument.paragraphStyles.item(thisPSName + " PS").name;
        } catch (myError) {

            PSIdenticToText = app.activeDocument.paragraphStyles.add({
                name: thisPSName + " PS"
            });
        }

        //1. Passa à fonte do texto e tamanho do texto
        PSIdenticToText.pointSize = styles_to_use[randomParagraphStyle].textPointSize;


        //tenta meter fonte do conhecimento se nao der mete a minion
        try {
            PSIdenticToText.appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;
        } catch (myError) {
            PSIdenticToText.appliedFont = "Minion Pro\tRegular";
        }

        //PSIdenticToText.appliedFont = styles_to_use[randomParagraphStyle].textAppliedFont;



        //PSIdenticToText.fontStyle = styles_to_use[randomParagraphStyle].textFontStyle;
        //PSIdenticToText.gridAlignFirstLineOnly = false;

        //leading
        PSIdenticToText.alignToBaseline = true;
        PSIdenticToText.leading = styles_to_use[randomParagraphStyle].textLeading;
        PSIdenticToText.fillColor = "Black";

        //Others
        PSIdenticToText.spaceAfter = 0;
        PSIdenticToText.spaceBefore = 0;

        //PSIdenticToText.leftIndent = app.activeDocument.paragraphStyles.item(thisPSName).leftIndent;
        PSIdenticToText.leftIndent = 0;
        //PSIdenticToText.firstLineIndent = app.activeDocument.paragraphStyles.item(thisPSName).firstLineIndent;
        PSIdenticToText.firstLineIndent = "12 pt";


        //atribui a estes a mesma justificação e mesma hifeniação do Ps to texto
        //Justification
        switch (styles_to_use[randomParagraphStyle].justification) {
            case "left":
                PSIdenticToText.justification = Justification.LEFT_ALIGN;
                $.writeln("left");
                break;
            case "center":
                PSIdenticToText.justification = Justification.CENTER_ALIGN;
                break;
            case "justified":
                PSIdenticToText.justification = Justification.LEFT_JUSTIFIED;
                $.writeln("justified");
                break;
            default:
                PSIdenticToText.justification = Justification.LEFT_ALIGN;
        }

        //Hifenização
        switch (styles_to_use[randomParagraphStyle].hyphenation) {
            case "true":
                PSIdenticToText.hyphenation = true;
                $.writeln("true");
                break;
            default:
                PSIdenticToText.hyphenation = false;
        }
    }

    return textFontSize_accordingToSize;
}




function create_PSbetween_Text_andTitle(randomParagraphStyle, textParagraphStyle, titleParagraphStyle, titlePointSize, textPointSize) {


    // $.writeln((stylesToMap_fromText_Title.length + 1) + "   stylesToMap_fromText_Title.length");
    // $.writeln((titlePointSize - textPointSize) + "   titlePointSize - textPointSize");


    //O ultimo titulo vai ser do tamanho do texto
    if (stylesToMap_fromText_Title.length <= 2) {
        var increment = Math.floor((titlePointSize - textPointSize) / (stylesToMap_fromText_Title.length + 1));
    } else {    //o ultimo título é maior que o texto
        var increment = Math.floor((titlePointSize - textPointSize) / stylesToMap_fromText_Title.length);
    }

    // $.writeln("increment +++++++++++++++  " + increment);


    // for (var ps = 0; ps < stylesToMap_fromText_Title.length; ps++) {
    //     $.writeln(stylesToMap_fromText_Title[ps].name + "       +++++++++++++++++++++");
    // }



    //
    //
    // dar valor consoante ser mais ou menos de 2 ps intermedios
    if (stylesToMap_fromText_Title.length >= 2) {
        var ad = 1;
    } else {
        var ad = 0;
    }

    for (var ps = 0; ps < stylesToMap_fromText_Title.length; ps++) {

        var thisPSName = stylesToMap_fromText_Title[ps].name;

        try {
            app.activeDocument.paragraphStyles.item(thisPSName + " PS").name;
        } catch (myError) {

            PS_betweenText_andTitle = app.activeDocument.paragraphStyles.add({
                name: thisPSName + " PS"
            });
        }

        //1. Passa à fonte do texto e tamanho do texto
        PS_betweenText_andTitle.pointSize = (textPointSize + (increment * (ps + ad))) + "pt";



        //tenta meter fonte do conhecimento se nao der mete a minion
        try {
            PS_betweenText_andTitle.appliedFont = styles_to_use[randomParagraphStyle].titleAppliedFont;
        } catch (myError) {
            //PS_betweenText_andTitle.appliedFont = "Minion Pro\tBold";
            try {
                PS_betweenText_andTitle.appliedFont = "Minion Pro\tBold";
            } catch (myError) {
                PS_betweenText_andTitle.appliedFont = "Minion Pro\tRegular";
            }
        }
        //PS_betweenText_andTitle.appliedFont = styles_to_use[randomParagraphStyle].titleAppliedFont;






        //PS_betweenText_andTitle.fontStyle = styles_to_use[randomParagraphStyle].titleFontStyle;

        //PS_betweenText_andTitle.gridAlignFirstLineOnly = false;

        PS_betweenText_andTitle.alignToBaseline = true;
        PS_betweenText_andTitle.gridAlignFirstLineOnly = true;

        //leading
        PS_betweenText_andTitle.alignToBaseline = true;
        //PS_betweenText_andTitle.leading = ((textPointSize + increment * i) * styles_to_use[randomParagraphStyle].textLeading) + "pt";
        PS_betweenText_andTitle.leading = (textPointSize + (increment * (ps + ad))) * styles_to_use[randomParagraphStyle].textLeading + "pt";


        PS_betweenText_andTitle.fillColor = "Black";

        //Others
        PS_betweenText_andTitle.spaceAfter = 0;
        PS_betweenText_andTitle.spaceBefore = 0;

        PS_betweenText_andTitle.leftIndent = 0;
        PS_betweenText_andTitle.firstLineIndent = 0;


        //Justification acoording to tile
        switch (styles_to_use[randomParagraphStyle].titleJustification) {
            case "left":
                PS_betweenText_andTitle.justification = Justification.LEFT_ALIGN;
                break;
            case "center":
                PS_betweenText_andTitle.justification = Justification.CENTER_ALIGN;
                break;
            case "justified":
                PS_betweenText_andTitle.justification = Justification.LEFT_JUSTIFIED;
                break;
            default:
                PS_betweenText_andTitle.justification = Justification.LEFT_ALIGN;
        }


        //PS_betweenText_andTitle.justification = app.activeDocument.paragraphStyles.item(titleParagraphStyle).justification;
        //PS_betweenText_andTitle.hyphenation = false;
        PS_betweenText_andTitle.hyphenation = true;

    }
}





// crete Ps to be used on de sections
function create_Section_PS(titleParagraphStyle, textParagraphStyle, textFontSize_accordingToSize) {
    var titlePS = app.activeDocument.paragraphStyles.item(titleParagraphStyle);
    var textPS = app.activeDocument.paragraphStyles.item(textParagraphStyle);
    // var titlePS = app.activeDocument.paragraphStyles.item(titleParagraphStyle + " PS");
    // var textPS = app.activeDocument.paragraphStyles.item(textParagraphStyle + " PS");

    var newParagraphStyle = app.activeDocument.paragraphStyles.item("Section PS");

    try {
        var myName = newParagraphStyle.name;
    } catch (myError) {

        newParagraphStyle = app.activeDocument.paragraphStyles.add({
            name: "Section PS"
        });
    }


    //tamanho da fonte de texto
    newParagraphStyle.pointSize = textPS.pointSize - 1;


    //mesma fonte que a usada nos títulos
    newParagraphStyle.appliedFont = titlePS.appliedFont;

    newParagraphStyle.firstLineIndent = textFontSize_accordingToSize + "pt";

    //mesmo peso do título
    //newParagraphStyle.fontStyle = titlePS.fontStyle;
}





//Generate different composition for the titles
function treat_Titles() {

    $.writeln(" ");
    $.writeln(treatTitlesGenerative + " treatTitlesGenerative");
    $.writeln(newPage + " newPage");
    $.writeln(columnBreak + " columnBreak");
    $.writeln(backgroundColor + " backgroundColor");


    //Clear the find/change grep preferences. 
    app.findGrepPreferences = NothingEnum.nothing;

    //Set the find options. 

    //var title_PS = get_title_ParagraphStyle();

    $.writeln(" ");
    $.writeln(PS_of_Title + " PS_of_Title");

    app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);

    try {
        var finds = app.activeDocument.findGrep();
    } catch (myError) {
    }


    //Clear the find/change preferences after the search. 
    app.findGrepPreferences = NothingEnum.nothing;



    if (finds.length > 0) { // something has been found


        if (newPage) { //Se estiver a true a nova página
            create_title_OnNewPage(finds);
            $.writeln("tratamento titulo nova PAGE ");

            var backgroundcolor_probability = Math.floor(Math.random() * 100);

            $.writeln("backgroundcolor_probability " + backgroundcolor_probability);
            $.writeln("backgroundColor_percentage " + backgroundColor_percentage);
            $.writeln("backgroundColor " + backgroundColor);

            //2. se for menor que a percentagem aplica cor de fundo
            if (backgroundcolor_probability < backgroundColor_percentage || backgroundColor) {
                titlesBackground();
                $.writeln("aplica cor !!!!!!");
            }
        }
        else if (columnBreak) { //Se estiver a true a nova coluna
            create_title_breakColumn(finds);
            $.writeln("tratamento titulo nova COLUNA ");
        }
        else {
            if (treatTitlesGenerative) {    //se for generativo

                //1. calcula um random entre 0 e 100;
                var probability = Math.floor(Math.random() * 100);
                $.writeln("probability " + probability);
                $.writeln("treatTitlesGenerative_percentage " + treatTitlesGenerative_percentage);

                //2. se for menor que a percentagem escolhe uma dar funções e aplica
                if (probability < treatTitlesGenerative_percentage) {
                    var randomChoise = Math.round(Math.random());
                    $.writeln("randomChoise " + randomChoise);

                    if (randomChoise == 0) {
                        $.writeln("treat titles PAGE");
                        create_title_OnNewPage(finds);
                    } else {
                        $.writeln("treat titles COLUMN");
                        create_title_breakColumn(finds);

                    }
                }
            }
        }
    }


}


function titlesBackground() {

    //1. Criar layer para desenhar formas
    try {
        var myLayer = app.activeDocument.layers.item("shapesLayer");
        var myName = myLayer.name;
    }
    catch (myError) {
        app.activeDocument.layers.add({ name: "shapesLayer" });
        app.activeDocument.layers.itemByName("shapesLayer").move(LocationOptions.AT_END);
    }

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("shapesLayer");

    //4. Procurar em que página ficaram os títulos

    var title_PS = get_title_ParagraphStyle();

    app.findGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(title_PS);

    try {
        var finds = app.activeDocument.findGrep();
    } catch (myError) {
        $.writeln(" ERRO NO GREP");
    }

    app.findGrepPreferences = NothingEnum.nothing;


    if (finds.length > 0) { // something has been found

        var documentColors = app.activeDocument.colors;
        var randomColorNumber = Math.floor(Math.random() * (documentColors.length - 4)) + 4;
        $.writeln("randomColorNumber   " + randomColorNumber);

        // for the 1st found item display the name of the page where the 1st text frame (there can be several threaded frames) containing it is located
        for (var i = 0; i < finds.length; i++) {

            var pageNum = null;

            try {
                pageNum = parseInt(finds[i].parentTextFrames[0].parentPage.name);
            } catch (myError) { }
            //var sectionContents = finds[i].contents;

            if (pageNum != null) {
                $.writeln("pageNum " + pageNum + " do titulo " + i);
            }


            //3. desenhar retangulo e preencher
            var myRec = app.activeDocument.pages.item(pageNum - 1).rectangles.add({ geometricBounds: [0, 0, app.activeDocument.documentPreferences.pageHeight, app.activeDocument.documentPreferences.pageWidth] });
            myRec.fillColor = documentColors[randomColorNumber];
        }
    }

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");
}


function create_title_OnNewPage(finds) {

    for (var i = finds.length - 1; i >= 1; i--) {
        //for (var i = 0; i < finds.length; i++) {

        $.writeln("  ----  " + i);
        $.writeln(finds[i].contents);


        var story = finds[i].parentStory;
        var findSize = finds[i].contents.length - 1;
        var indexOfChar = finds[i].index;

        if (parseInt(finds[i].parentTextFrames[0].parentPage.name) >= 3) {
            //caracter antes
            var charBeforeContents = story.characters[indexOfChar].contents;
            //caracter depois
            var charAfterContents = story.characters[indexOfChar + findSize].contents;


            //Column break -> 1396927554
            //Page break -> 1396927554

            //Adicionar antes se não tiver
            if (charBeforeContents != "1397778242" && charBeforeContents != "1396927554") {
                story.characters[indexOfChar - 1].contents = SpecialCharacters.PAGE_BREAK;
                $.writeln("nao tem nada antes");
            } else { }

            //adicionar depois se não tiver
            if (charAfterContents != "1397778242" && charAfterContents != "1396927554") {
                story.characters[indexOfChar + findSize].contents = SpecialCharacters.PAGE_BREAK;
                $.writeln("nao tem nada depois");
            } else { }
        }
    }
}

function create_title_breakColumn(finds) {
    for (var i = finds.length - 1; i >= 1; i--) {
        //for (var i = 0; i < finds.length; i++) {

        $.writeln("  ----  " + i);
        $.writeln(finds[i].contents);


        var story = finds[i].parentStory;
        var findSize = finds[i].contents.length - 1;
        var indexOfChar = finds[i].index;


        if (parseInt(finds[i].parentTextFrames[0].parentPage.name) >= 3) {
            //caracter antes
            var charBeforeContents = story.characters[indexOfChar].contents;
            //caracter depois
            var charAfterContents = story.characters[indexOfChar + findSize].contents;


            //Column break -> 1396927554
            //Page break -> 1396927554

            //Adicionar antes se não tiver
            if (charBeforeContents != "1397778242" && charBeforeContents != "1396927554") {
                story.characters[indexOfChar - 1].contents = SpecialCharacters.PAGE_BREAK;
                $.writeln("nao tem nada antes");
            } else { }

            //adicionar depois se não tiver
            if (charAfterContents != "1397778242" && charAfterContents != "1396927554") {
                story.characters[indexOfChar + findSize].contents = SpecialCharacters.COLUMN_BREAK;
                $.writeln("nao tem nada depois");
            } else { }
        }
    }
}




//——————————————————————————————————————————————————



//meter os random baseados na largura das colunas
// DiogoFerreira - tenho muito de ativar isto
function randomTextIndent_andColor() {

    var possibleIndentValues = [0, docWidth / 7, docWidth / 5, docWidth / 2];
    var randomIndentValue;
    var previousValue;

    //textParagraphStyle = get_mostUsed_ParagraphStyle();
    textParagraphStyle = textParagraphStyle_name;

    var textPS = app.activeDocument.paragraphStyles.item(textParagraphStyle);
    //atribuir cor
    // var documentColors = app.activeDocument.colors;
    // var randomColorNumber = Math.floor(Math.random() * (documentColors.length - 3)) + 3;
    // textPS.fillColor = documentColors[randomColorNumber];


    var random_Lightcolor = lightColors[Math.floor(Math.random() * lightColors.length) - 1];
    //color name
    var colorName = String(random_Lightcolor);

    // if (textPS.fillColor.name == "Black") { //Escolhe uma cor clara
    //     $.writeln("E preta a cor do texto");
    //     textPS.fillColor = app.activeDocument.colors.itemByName(colorName);
    // } else { // escolhe uma cor escura
    //     $.writeln("NAOOOOO E preta a cor do texto");
    //     textPS.fillColor = app.activeDocument.colors.itemByName(colorName);
    // }


    var allParagraphs = app.activeDocument.stories.everyItem().paragraphs.everyItem().getElements();


    //aplicar indent a cada paragrafo
    for (var i = 0; i < allParagraphs.length; i++) {
        if (allParagraphs[i].appliedParagraphStyle.name == textParagraphStyle) {
            randomIndentValue = Math.floor(Math.random() * (possibleIndentValues.length));

            do {
                randomIndentValue = Math.floor(Math.random() * (possibleIndentValues.length));
            }
            while (randomIndentValue == previousValue);

            previousValue = randomIndentValue;

            allParagraphs[i].firstLineIndent = 0;
            allParagraphs[i].leftIndent = possibleIndentValues[randomIndentValue];
        }
    }
}




//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ MAP PARAGRAPH STYLES ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

//call all the mapping styles
function applyPStyles() {

    var allParaStyles = app.activeDocument.allParagraphStyles;

    //i = 2 porque o primeiro não existe e o seguyndo é o basico
    for (var i = 2; i < allParaStyles.length; i++) {

        var check = null;

        var actualPSname = allParaStyles[i].name;
        //$.writeln("actualPSname " + actualPSname);

        var values = actualPSname.split(" ");

        if (values[1] != "PS") {
            //Criar novo PS para o texto para depois substituir
            try {
                check = app.activeDocument.paragraphStyles.item(actualPSname + " PS").name;
            } catch (myError) {
                //$.writeln("nao tem igual ao " + actualPSname);
            }

            if (check != null) {
                //$.writeln("fez mapping para o      " + actualPSname + " PS");
                mapPStyleIntoAnother(actualPSname, actualPSname + " PS");
            }
        }

    }

}



//base funtion to map one style into another
function mapPStyleIntoAnother(basePStyle, newPStyle) {
    //Clear the find/change grep preferences. 
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;

    //Set the find options
    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;
    app.findGrepPreferences.appliedParagraphStyle = basePStyle;
    //app.findGrepPreferences.appliedParagraphStyle = "Heading 2";

    //Apply the change
    //app.changeGrepPreferences.underline = true;
    app.changeGrepPreferences.appliedParagraphStyle = newPStyle;
    app.activeDocument.changeGrep();

    //Clear the find/change preferences after the search. 
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
}





//CREATE PARAGRAPH STYLES
//
// function createParagraphStyles(PSname, font, fontStyle, justification) {
//     var pStyle = myDocument.paragraphStyles.item(PSname);

//     try {
//         var myName = pStyle.name;
//     } catch (myError) {
//         //The paragraph style did not exist, so create it.
//         pStyle = myDocument.paragraphStyles.add({
//             name: PSname
//         });
//     }

//     //Set the formatting of the paragraph style.
//     pStyle.appliedFont = font;
//     pStyle.fontStyle = fontStyle;
//     pStyle.justification = justification;

//     return pStyle;
// }




function treatSubtitles() {

    var allParaStyles = app.activeDocument.allParagraphStyles;

    //i = 2 porque o primeiro não existe e o seguyndo é o basico
    for (var i = 2; i < allParaStyles.length; i++) {

        var actualPSname = allParaStyles[i].name;
        var checkPS = actualPSname.split(" ").pop();


        $.writeln(actualPSname);
        $.writeln(i);
        $.writeln(app.activeDocument.paragraphStyles.item(actualPSname).appliedFont.name);
        $.writeln(app.activeDocument.paragraphStyles.item("Heading 2 PS").appliedFont.name);



        if (actualPSname == "Heading 2 PS") {


            //Clear the find/change grep preferences. 
            app.findGrepPreferences = NothingEnum.nothing;
            app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(actualPSname);

            try {
                var finds = app.activeDocument.findGrep();
            } catch (myError) {
            }

            //Clear the find/change preferences after the search. 
            app.findGrepPreferences = NothingEnum.nothing;




            if (finds.length > 0) { // something has been found


                for (var k = finds.length - 1; k >= 0; k--) {

                    $.writeln(" finds[k].contents " + finds[k].contents);

                    var story = finds[k].parentStory;
                    var findSize = finds[k].contents.length - 1;
                    var indexOfChar = finds[k].index;


                    if (parseInt(finds[k].parentTextFrames[0].parentPage.name) >= 3) {
                        //caracter antes
                        var charBeforeContents = story.characters[indexOfChar - 1].contents;
                        //caracter depois
                        var charAfterContents = story.characters[indexOfChar + findSize].contents;


                        $.writeln("charBeforeContents " + charBeforeContents);


                        //Remover antes se tiver
                        if (charBeforeContents == "\r") {
                            //story.characters[indexOfChar - 1].contents = "AROZZZZ";
                            story.characters[indexOfChar - 1].remove();
                            $.writeln("TEM ANTES");
                        }

                        // //adicionar depois se não tiver
                        // if (charAfterContents != "1397778242" && charAfterContents != "1396927554") {
                        //     story.characters[indexOfChar + findSize].contents = SpecialCharacters.COLUMN_BREAK;
                        //     $.writeln("nao tem nada depois");
                        // } else { }
                    }

                }
            }

        }

    }


}



function cleanTextFrames_FirstCharacter() {
    var myTextFrames = app.activeDocument.textFrames;

    $.writeln(myTextFrames.length);

    for (var i = 0; i < myTextFrames.length; i++) {
        //if (myTextFrames[i].characters[0] == "\r") {

        var testaCharacter = null;

        try {
            testaCharacter = myTextFrames[i].characters[0].contents;
        } catch (myError) { }


        if (testaCharacter != null && testaCharacter == "\r") {
            myTextFrames[i].characters[0].remove();
        }
    }
}



function changeDocumentLanguage() {
    //app.activeDocument.paragraphs.everyItem().appliedLanguage = "English: UK";
    app.activeDocument.stories.everyItem().appliedLanguage = documentLanguage;
}






// "style0": ["LaNord_Antwerp", "Lyon Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "La Nord\tBold", "Bold", "35pt", "center"],
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
// "style21": ["nao", "Domaine Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "Domaine Text\tBold", "35pt", "left"]