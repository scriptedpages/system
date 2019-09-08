function create_shapes_gradients_layer() {

    //Create a layer
    try {
        var myLayer = app.activeDocument.layers.item("shapesLayer");
        var myName = myLayer.name;
    }
    catch (myError) {
        app.activeDocument.layers.add({ name: "shapesLayer" });
        app.activeDocument.layers.itemByName("shapesLayer").move(LocationOptions.AT_END);
    }

    app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");
}

//———————————————————————————————————————————————————————————————————————————

// SHAPES
function createShapes() {


    if (experimental_backgroundColour.value) {
        //if (create_shapes) {

        app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("shapesLayer");


        var random_Lightcolor = lightColors[Math.floor(Math.random() * lightColors.length)];
        //color name
        var colorName = String(random_Lightcolor);


        var myMasters = app.activeDocument.masterSpreads;

        for (var i = 0; i < myMasters.length; i++) {

            //LEFT PAGE
            var leftrect = myMasters[i].pages.item(0).rectangles.add();
            leftrect.geometricBounds = [-3, -3, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.documentPreferences.pageWidth / 2];
            //leftrect.fillColor = app.activeDocument.colors.itemByName("100,0,0,0");
            leftrect.fillColor = app.activeDocument.colors.itemByName(ChoosenColorForBook);

            //RIGHT PAGE
            var rightrect = myMasters[i].pages.item(1).rectangles.add();
            rightrect.geometricBounds = [-3, app.activeDocument.documentPreferences.pageWidth / 2, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.documentPreferences.pageWidth + 3];
            //rightrect.fillColor = app.activeDocument.colors.itemByName("100,0,0,0");
            rightrect.fillColor = app.activeDocument.colors.itemByName(ChoosenColorForBook);
        }

        app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");

    }
}

//———————————————————————————————————————————————————————————————————————————

function create_gradientShapes() {

    if (experimental_GradientColour.value) {
        //if (create_gradients) {

        //Set active layer to shapes layer
        app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("shapesLayer");


        var random_Lightcolor = lightColors[Math.floor(Math.random() * lightColors.length)];
        //color name
        var colorName = String(random_Lightcolor);


        //Create Gradient
        var gradient_name = "Gradient" + colorName;


        try {
            var myGradient = app.activeDocument.gradients.item(gradient_name);
            //If the gradient does not exist, trying to get its name will generate an error. 
            var gradientName = myGradient.name;
        }
        catch (myError) {
            //The gradient style did not exist, so create it.
            myGradient = app.activeDocument.gradients.add({
                name: gradient_name,
                type: GradientType.LINEAR
            });
        }

        // //var myGradient = app.activeDocument.gradients.add({ name: "Gradient", type: GradientType.LINEAR });
        //myGradient.gradientStops[0].stopColor = app.activeDocument.colors.item(colorName);
        myGradient.gradientStops[0].stopColor = app.activeDocument.colors.item(ChoosenColorForBook);
        myGradient.gradientStops[1].stopColor = app.activeDocument.colors.item("Paper");


        //myGradient.gradientStops.add({ location: 25, stopColor: myColor3 });
        //myGradient.gradientStops.add({ location: 75, stopColor: myColor4 });

        // var myRec = app.activeWindow.activePage.rectangles.add({ geometricBounds: [0, 0, app.activeDocument.documentPreferences.pageHeight, app.activeDocument.documentPreferences.pageWidth] });
        // myRec.fillColor = app.activeDocument.gradients.item(gradient_name);


        var myMasters = app.activeDocument.masterSpreads;


        if (interiorMarginGradient) {
            //create_interiorMarginGradient(myMasters, gradient_name);
            create_interiorMarginGradient(myMasters, ChoosenColorForBook);
        } else if (exteriorMarginGradient) {
            //create_exteriorMarginGradient(myMasters, gradient_name);
            create_exteriorMarginGradient(myMasters, ChoosenColorForBook);
        } else {
            //1. calcula um random entre 0 e 100;
            var probability = Math.floor(Math.random() * 100);

            if (probability <= interiorMarginGradient_percentage && probability <= exteriorMarginGradient_percentage) { //se forem os dois menores faz os dois
                create_interiorMarginGradient(myMasters, gradient_name);
                create_exteriorMarginGradient(myMasters, gradient_name);
            } else if (probability <= interiorMarginGradient_percentage || probability <= exteriorMarginGradient_percentage) { // se um for menor faz 1
                if (probability <= interiorMarginGradient_percentage) {
                    create_interiorMarginGradient(myMasters, gradient_name);
                }

                if (probability <= exteriorMarginGradient_percentage) {
                    create_exteriorMarginGradient(myMasters, gradient_name);
                }
            } else { // else faz este
                create_exteriorMarginGradient(myMasters, gradient_name);
            }
        }


        //Reset active layer
        app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("Layer 1");
    }
}


// INTERIOR MARGIN
function create_interiorMarginGradient(myMasters, gradient_name) {
    // OPCAO 2 — Dentro para fora
    for (var i = 0; i < myMasters.length; i++) {
        //LEFT PAGE
        var leftrect = myMasters[i].pages.item(0).rectangles.add();
        leftrect.geometricBounds = [-3, app.activeDocument.documentPreferences.pageWidth - app.activeDocument.pages.firstItem().marginPreferences.left, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.documentPreferences.pageWidth];
        leftrect.fillColor = app.activeDocument.gradients.item(gradient_name);

        var myRotation = app.transformationMatrices.add({ counterclockwiseRotationAngle: 180 });
        leftrect.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myRotation);

        //RIGHT PAGE
        var rightrect = myMasters[i].pages.item(1).rectangles.add();
        rightrect.geometricBounds = [-3, 0, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.pages.firstItem().marginPreferences.left];
        rightrect.fillColor = app.activeDocument.gradients.item(gradient_name);
    }
}


// EXTERIOR GRADIENT
function create_exteriorMarginGradient(myMasters, gradient_name) {
    //OPCAO 1 — Fora para dentro
    for (var i = 0; i < myMasters.length; i++) {
        //LEFT PAGE
        var leftrect = myMasters[i].pages.item(0).rectangles.add();
        leftrect.geometricBounds = [-3, -3, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.pages.firstItem().marginPreferences.right];
        leftrect.fillColor = app.activeDocument.gradients.item(gradient_name);

        //RIGHT PAGE
        var rightrect = myMasters[i].pages.item(1).rectangles.add();
        rightrect.geometricBounds = [-3, app.activeDocument.documentPreferences.pageWidth - myMasters[i].pages.item(1).marginPreferences.right, app.activeDocument.documentPreferences.pageHeight + 3, app.activeDocument.documentPreferences.pageWidth + 3];
        rightrect.fillColor = app.activeDocument.gradients.item(gradient_name);

        var myRotation = app.transformationMatrices.add({ counterclockwiseRotationAngle: 180 });
        rightrect.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myRotation);
    }
}


//———————————————————————————————————————————————————————————————————————————


function createColours() {

    // LIGHT COLOURS
    for (var i = 0; i < lightColors.length; i++) {

        var colorName = String(lightColors[i]);

        //Create a color.
        try {
            var myColorA = app.activeDocument.colors.item(colorName).name;
        }
        catch (myError) {
            //The color style did not exist, so create it.
            myColorA = app.activeDocument.colors.add({
                name: colorName,
                model: ColorModel.process,
                colorValue: lightColors[i]
            });
        }
    }


    // // DARK COLOURS
    // for (var i = 0; i < darkColors.length; i++) {

    //     var colorName = String(darkColors[i]);
    //     //Create a color.
    //     try {
    //         var myColorA = app.activeDocument.colors.item(colorName).name;
    //     }
    //     catch (myError) {
    //         //The color style did not exist, so create it.
    //         myColorA = app.activeDocument.colors.add({
    //             name: colorName,
    //             model: ColorModel.process,
    //             colorValue: darkColors[i]
    //         });
    //     }
    // }
}