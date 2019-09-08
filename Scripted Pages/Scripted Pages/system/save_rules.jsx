//variaveis para guardar o ficheiro JSON


// ————— Colours
var save_ChossenLightColour;


// - - - Treat Titles
var save_treatTitlesGenerative;
var save_newPage;
var save_columnBreak;


//------ Styles - Checks
var save_keepStyles;
var save_mapStyles;
var save_generativeStyles;

// Choosen style
var save_choosenStyle;

// ------ user
var save_generativeDocument;
var save_createIndex;
var save_createColophon;

// ------ Page
var save_pageWidth;
var save_pageHeight;
var save_generatePageSize;
var save_baseline;

// ------ Margins
var save_generativeMargins;
var save_topMargin;
var save_insideMargin;
var save_outsideMargin;
var save_bottomMargin;

// ------ Grid
var save_generativeColumns;
var save_columns;
var save_gutterSize;

// ------ Master
var save_choosenMaster;

// ------ Experimental
var save_create_shapes;
var save_create_gradients;
var save_randomTextIndent;
var save_bigCover;


//Var font sizes
var save_titleSize;
var save_textSize;

//var save_caption style
var save_captionStyle;



function defineVariables_tosave_JSON() {


    //Choosen style
    //$.writeln("save_choosenStyle  " + save_choosenStyle + "     ---   " + typeof (save_choosenStyle));

    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].psName);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].textAppliedFont);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].textPointSize);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].textLeading);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].justification);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].hyphenation);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].titleAppliedFont);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].titlePointSize);
    // $.writeln("save_choosenStyle  " + paragraphStyles_knowledge[save_choosenStyle].titleJustification);

    // $.writeln("save_titleSize " + save_titleSize);
    // $.writeln("save_textSize " + save_textSize);


    //Colour
    //save_ChossenLightColour = random_Lightcolor;
    // $.writeln("save_ChossenLightColour  " + save_ChossenLightColour);

    // $.writeln("");

    //Styles - Checks
    save_keepStyles = keepStylesCheck.value;
    save_mapStyles = mapStylesCheck.value;
    save_generativeStyles = generativeStylesCheck.value;
    // $.writeln("save_keepStyles  " + save_keepStyles);
    // $.writeln("save_mapStyles  " + save_mapStyles);
    // $.writeln("save_generativeStyles  " + save_generativeStyles);
    // $.writeln("");


    //user
    save_generativeDocument = false;
    save_createIndex = createIndex_Check.value;
    save_createColophon = createColophon_Check.value;
    // $.writeln("save_generativeDocument  " + save_generativeDocument);
    // $.writeln("save_createIndex  " + save_createIndex);
    // $.writeln("save_createColophon  " + save_createColophon);
    // $.writeln("");


    //Page
    save_pageWidth = docWidth;
    save_pageHeight = docHeight;
    save_generatePageSize = false;
    save_baseline = baseline;
    // $.writeln("save_pageWidth  " + save_pageWidth);
    // $.writeln("save_pageHeight  " + save_pageHeight);
    // $.writeln("save_generatePageSize  " + save_generatePageSize);
    // $.writeln("save_baseline  " + save_baseline);
    // $.writeln("");

    //Margins
    save_generativeMargins = false;
    save_topMargin = topMargin;
    save_insideMargin = insideMargin;
    save_outsideMargin = outsideMargin;
    save_bottomMargin = bottomMargin;
    // $.writeln("save_generativeMargins  " + save_generativeMargins);
    // $.writeln("save_topMargin  " + save_topMargin);
    // $.writeln("save_insideMargin  " + save_insideMargin);
    // $.writeln("save_outsideMargin  " + save_outsideMargin);
    // $.writeln("save_bottomMargin  " + save_bottomMargin);
    // $.writeln("");

    //Grid
    save_generativeColumns = false;
    save_columns = numColumns;
    save_gutterSize = gutterSize;
    // $.writeln("save_generativeColumns  " + save_generativeColumns);
    // $.writeln("save_columns  " + save_columns);
    // $.writeln("save_gutterSize  " + save_gutterSize);
    // $.writeln("");


    //Experimental
    save_create_shapes = experimental_backgroundColour.value;
    save_create_gradients = experimental_GradientColour.value;
    save_randomTextIndent = experimental_ParagraphIndents.value;
    save_bigCover = experimental_BigCover.value;
    // $.writeln("save_create_shapes  " + save_create_shapes);
    // $.writeln("save_create_gradients  " + save_create_gradients);
    // $.writeln("save_randomTextIndent  " + save_randomTextIndent);
    // $.writeln("save_bigCover  " + save_bigCover);
    // $.writeln("");
}



// {
//     "rules": {
//         "charactersByLine": {
//             "maxCharactersLine": 75,
//             "minCharactersLine": 30
//         },
//         "wordDocument": {
//             "longDocument_words": 50000,
//             "image_book_images": 10
//         },
//         "fontSize": {
//             "minFontSize": 8,
//             "maxFontSize": 12
//         },
//         "columns": {
//             "minColumns": 70,
//             "maxColumns": 140
//         },
//         "margins": {
//             "smallSize": {
//                 "width": 170,
//                 "height": 200,
//                 "minTopMargin": 7,
//                 "maxTopMargin": 15,
//                 "minBotttomMargin": 7,
//                 "maxBotttomMargin": 15,
//                 "minInsideMargin": 7,
//                 "maxInsideMargin": 20,
//                 "minOutsideMargin": 7,
//                 "maxOutsideMargin": 20
//             },
//             "bigSize": {
//                 "minTopMargin": 7,
//                 "maxTopMargin": 30,
//                 "minBotttomMargin": 7,
//                 "maxBotttomMargin": 30,
//                 "minInsideMargin": 7,
//                 "maxInsideMargin": 30,
//                 "minOutsideMargin": 7,
//                 "maxOutsideMargin": 30
//             }
//         },
//         "colors": {
//             "lightColors": {
//                 "c0": [100, 0, 0, 0],
//                 "c1": [0, 40, 100, 0],
//                 "c2": [0, 60, 100, 0],
//                 "c3": [0, 100, 100, 0],
//                 "c4": [0, 39, 3, 0],
//                 "c5": [56, 10, 0, 0],
//                 "c6": [0, 0, 100, 0],
//                 "c7": [2, 14, 38, 0]
//             },
//             "darkColors": {
//                 "c0": [0, 0, 40, 0],
//                 "c1": [0, 0, 40, 50]
//             }
//         },
//         "sizes": {
//             "smallSizes": {
//                 "size0": [110, 170],
//                 "size1": [110, 180],
//                 "size2": [130, 200],
//                 "size3": [105, 180],
//                 "size4": [120, 220]
//             },
//             "bigSizes": {
//                 "size0": [170, 240],
//                 "size1": [200, 270]
//             }
//         }
//     },
//     "PStyles": {
//         "treatTitles": {
//             "treatTitlesGenerative": true,
//             "treatTitlesGenerative_percentage": 90,
//             "newPage": false,
//             "columnBreak": false,
//             "backgroundColor": false,
//             "backgroundColor_percentage": 80
//         },
//         "checkBoxes": {
//             "keepStyles": false,
//             "mapStyles": false,
//             "generativeStyles": true
//         },
//         "Sizes_and_resopective_FontSizes": {
//             "pequenos_tam": 110,
//             "pequenos_fonte_text": [9, 10],
//             "pequenos_fonte_title": [20, 30],
//             "medios_tam": 150,
//             "medios_fonte_text": [10, 11],
//             "medios_fonte_title": [20, 30],
//             "grandes_tam": 200,
//             "grandes_fonte_text": [11, 13],
//             "grandes_fonte_title": [30, 40]
//         },
//         "styles": {
//             "style0": ["LaNord_Antwerp", "Lyon Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "La Nord\tBold", "Bold", "35pt", "left"],
//             "style1": ["LaNord_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "La Nord\tBold", "35pt", "left"],
//             "style2": ["Helvetica_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Helvetica\tBold", "35pt", "left"],
//             "style3": ["Scala_Arno", "Arno Pro\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Scala Sans (TT)\tBold", "35pt", "left"],
//             "style4": ["GillSans_Baskerville", "Baskerville\tRegular", "10.5pt", 1.25, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
//             "style5": ["GillSans_Perpetua", "Perpetua Std\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
//             "style6": ["GillSans_Minion", "Minion Pro\tRegular", "10.5pt", 1.28, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
//             "style7": ["Futura_Sabon", "Sabon LT Std\tRoman", "10.5pt", 1.28, "justified", "true", "  ", "Futura\tBold", "35pt", "left"],
//             "style8": ["Univers_Sabon", "Sabon LT Std\tRoman", "10.5pt", 1.28, "justified", "true", "  ", "Univers LT Std\t65 Bold", "35pt", "left"],
//             "style9": ["Scala_Scala", "Scala\tRegular", "10.5pt", 1.28, "justified", "true", "  ", "Scala Sans (TT)\tBold", "35pt", "left"],
//             "style10": ["Helvetica_Joanna", "Joanna MT Std\tRegular", "10.5pt", 1.22, "justified", "true", "  ", "Helvetica\tBold", "35pt", "left"],
//             "style11": ["BRRR_Fournier", "Joanna MT Std\tRegular", "10.5pt", 1.17, "justified", "true", "  ", "BRRR\tMedium", "35pt", "left"],
//             "style12": ["Walsheim_Caslon", "Adobe Caslon Pro\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "GT Walsheim Pro\tBold", "35pt", "left"],
//             "style13": ["ProximaNova_Arnhem", "Arnhem\tNormal", "10.5pt", 1.2, "justified", "true", "  ", "Proxima Nova\tBold", "35pt", "left"],
//             "style14": ["Founders_Arnhem", "Arnhem\tNormal", "10.5pt", 1.17, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
//             "style15": ["Founders_Domain", "Domaine Text\tRegular", "10.5pt", 1.17, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
//             "style16": ["Neuzeit_Antwerp", "Antwerp\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Neuzeit Grotesk\tBold", "35pt", "left"],
//             "style17": ["Founders_Tiempos", "Tiempos Text\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Founders Grotesk\tMedium", "35pt", "left"],
//             "style18": ["GillSans_Times", "Times New Roman\tRegular", "10.5pt", 1.2, "justified", "true", "  ", "Gill Sans\tSemiBold", "35pt", "left"],
//             "style19": ["nao ", "Antwerp\tRegular", "10.5pt", 1.16, "justified", "true", "  ", "Fugue Tails\tRegular", "35pt", "left"],
//             "style20": ["nao ", "Antwerp\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "BRRR\tMedium", "35pt", "left"],
//             "style21": ["nao", "Domaine Text\tRegular", "10.5pt", 1.3, "justified", "true", "  ", "Domaine Text\tBold", "35pt", "left"],
//             "style22": ["Domain_Domain", "Domaine Text\tRegular", "10.5pt", 1.3, "left", "false", "  ", "Domaine Text\tBold", "35pt", "left"]
//         }
//     },
//     "user": {
//         "document": {
//             "generativeDocument": true,
//             "createIndex": false,
//             "createColophon": false
//         },
//         "page": {
//             "pageWidth": "110 mm",
//             "pageHeight": "180 mm",
//             "generatePageSize": true,
//             "baseline": "14.4pt"
//         },
//         "margins": {
//             "generativeMargins": true,
//             "topMargin": "12 mm",
//             "bottomMargin": "7 mm",
//             "insideMargin": "12 mm",
//             "outsideMargin": "7 mm"
//         },
//         "grid": {
//             "generativeColumns": false,
//             "columns": 1,
//             "gutterSize": "4 mm",
//             "minGutterSize": 3,
//             "maxGutterSize": 7
//         },
//         "masters": {
//             "_comment": "0—5 Masters, 6 is generative",
//             "choosenMaster": 100
//         },
//         "capset": {
//             "_comment": "0—1 capset style, 2 is generative",
//             "choosenCapset": "random"
//         },
//         "textWrap": {
//             "textWrap_value": 5
//         }
//     },
//     "experimental": {
//         "shapes": {
//             "create_shapes": false,
//             "shapes_percentage": 10
//         },
//         "gradients": {
//             "create_gradients": false,
//             "gradients_percentage": 30,
//             "interiorMarginGradient": false,
//             "interiorMarginGradient_percentage": 60,
//             "exteriorMarginGradient": false,
//             "exteriorMarginGradient_percentage": 70
//         },
//         "textIndent": {
//             "randomTextIndent": false
//         },
//         "cover": {
//             "bigCover": false
//         }
//     }
// }





// ———————————————————————————————————————————————————————————————————————————————————————————

function save_rules() {

    //savedStatic.visible = true;


    var choosenName = saveRulesFileField.text;


    if (choosenName == "") { //Se estiver vazio dou um nome
        var filename = 'myRules.json';
    } else if (choosenName.indexOf('.') > -1) { //Se tiver nome fica esse
        //remove possible extensions
        choosenName = choosenName.substring(0, choosenName.indexOf('.'));
        var filename = choosenName + '.json';
    } else {
        var filename = choosenName + '.json';
    }


    //Define path and file name
    var path = '~/Desktop/';


    var rules = {
        "rules": {
            "charactersByLine": {
                "maxCharactersLine": 75,
                "minCharactersLine": 30
            }
        }
    };


    var rules = {
        "rules": {
            "charactersByLine": {
                "maxCharactersLine": 75,
                "minCharactersLine": 30
            },
            "wordDocument": {
                "longDocument_words": 50000,
                "image_book_images": 10
            },
            "fontSize": {
                "minFontSize": 8,
                "maxFontSize": 12
            },
            "columns": {
                "minColumns": 70,
                "maxColumns": 140
            },
            "margins": {
                "smallSize": {
                    "width": 170,
                    "height": 200,
                    "minTopMargin": 7,
                    "maxTopMargin": 15,
                    "minBotttomMargin": 7,
                    "maxBotttomMargin": 15,
                    "minInsideMargin": 7,
                    "maxInsideMargin": 20,
                    "minOutsideMargin": 7,
                    "maxOutsideMargin": 20
                },
                "bigSize": {
                    "minTopMargin": 7,
                    "maxTopMargin": 30,
                    "minBotttomMargin": 7,
                    "maxBotttomMargin": 30,
                    "minInsideMargin": 7,
                    "maxInsideMargin": 30,
                    "minOutsideMargin": 7,
                    "maxOutsideMargin": 30
                }
            },
            "colors": {
                "lightColors": {
                    "c0": save_ChossenLightColour
                },
                "darkColors": {
                    "c0": [0, 0, 40, 0],
                    "c1": [0, 0, 40, 50]
                }
            },
            "sizes": {
                "smallSizes": {
                    "size0": [110, 170],
                    "size1": [110, 180],
                    "size2": [130, 200],
                    "size3": [105, 180],
                    "size4": [120, 220]
                },
                "bigSizes": {
                    "size0": [170, 240],
                    "size1": [200, 270]
                }
            }
        },
        "PStyles": {
            "treatTitles": {
                "treatTitlesGenerative": true,
                "treatTitlesGenerative_percentage": 90,
                "newPage": false,
                "columnBreak": false,
                "backgroundColor": false,
                "backgroundColor_percentage": 80
            },
            "checkBoxes": {
                "keepStyles": save_keepStyles,
                "mapStyles": save_mapStyles,
                "generativeStyles": save_generativeStyles
            },
            "Sizes_and_resopective_FontSizes": {
                "pequenos_tam": 110,
                "pequenos_fonte_text": [9, 10],
                "pequenos_fonte_title": [20, 30],
                "medios_tam": 150,
                "medios_fonte_text": [10, 11],
                "medios_fonte_title": [20, 30],
                "grandes_tam": 200,
                "grandes_fonte_text": [11, 13],
                "grandes_fonte_title": [30, 40]
            },
            "chossenSizes": {
                "titleSize": save_titleSize,
                "textSize": save_textSize
            },
            "styles": {
                "style0": [paragraphStyles_knowledge[save_choosenStyle].psName,
                paragraphStyles_knowledge[save_choosenStyle].textAppliedFont,
                paragraphStyles_knowledge[save_choosenStyle].textPointSize,
                paragraphStyles_knowledge[save_choosenStyle].textLeading,
                paragraphStyles_knowledge[save_choosenStyle].justification,
                paragraphStyles_knowledge[save_choosenStyle].hyphenation,
                    " ",
                paragraphStyles_knowledge[save_choosenStyle].titleAppliedFont,
                    " ",
                paragraphStyles_knowledge[save_choosenStyle].titlePointSize,
                paragraphStyles_knowledge[save_choosenStyle].titleJustification
                ]
            },
            "styles_short": {
                "style0": [paragraphStyles_knowledge[save_choosenStyle].psName,
                paragraphStyles_knowledge[save_choosenStyle].textAppliedFont,
                paragraphStyles_knowledge[save_choosenStyle].textPointSize,
                paragraphStyles_knowledge[save_choosenStyle].textLeading,
                paragraphStyles_knowledge[save_choosenStyle].justification,
                paragraphStyles_knowledge[save_choosenStyle].hyphenation,
                    " ",
                paragraphStyles_knowledge[save_choosenStyle].titleAppliedFont,
                    " ",
                paragraphStyles_knowledge[save_choosenStyle].titlePointSize,
                paragraphStyles_knowledge[save_choosenStyle].titleJustification
                ]
            }
        },
        "user": {
            "document": {
                "generativeDocument": false,
                "createIndex": save_createIndex,
                "createColophon": save_createColophon
            },
            "page": {
                "pageWidth": save_pageWidth + " mm",
                "pageHeight": save_pageHeight + " mm",
                "generatePageSize": false,
                "baseline": baseline + " pt"
            },
            "margins": {
                "generativeMargins": false,
                "topMargin": save_topMargin + " mm",
                "bottomMargin": save_bottomMargin + " mm",
                "insideMargin": save_insideMargin + " mm",
                "outsideMargin": save_outsideMargin + " mm"
            },
            "grid": {
                "generativeColumns": false,
                "columns": save_columns,
                "gutterSize": save_gutterSize + " mm",
                "minGutterSize": 3,
                "maxGutterSize": 7
            },
            "masters": {
                "_comment": "0—5 Masters, 6 is generative",
                "choosenMaster": save_choosenMaster
            },
            "capset": {
                "_comment": "0—1 capset style, 2 is generative",
                "choosenCapset": save_captionStyle
            },
            "textWrap": {
                "textWrap_value": 5
            }
        },
        "experimental": {
            "shapes": {
                "create_shapes": save_create_shapes,
                "shapes_percentage": 10
            },
            "gradients": {
                "create_gradients": save_create_gradients,
                "gradients_percentage": 30,
                "interiorMarginGradient": false,
                "interiorMarginGradient_percentage": 60,
                "exteriorMarginGradient": false,
                "exteriorMarginGradient_percentage": 70
            },
            "textIndent": {
                "randomTextIndent": save_randomTextIndent
            },
            "cover": {
                "bigCover": save_bigCover
            }
        }
    };


    var cenas = JSON.stringify(rules);

    //Create File object
    var file = new File(path + filename);

    file.encoding = 'UTF-8';
    file.open('w');
    file.write(cenas);
    file.close();

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
// "style22": ["Domain_Domain", "Domaine Text\tRegular", "10.5pt", 1.3, "left", "false", "  ", "Domaine Text\tBold", "35pt", "left"]