function findSectionsMakersWithGREP() {
    //Clear the find/change grep preferences. 
    app.findGrepPreferences = NothingEnum.nothing;

    app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item(PS_of_Title);
    //app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Title PS");


    try {
        var finds = app.activeDocument.findGrep();
    } catch (myError) {
        $.writeln(" ERRO NO GREP");
    }

    //var quotes = myDocument.pages.firstItem().findGrep();

    //Clear the find/change preferences after the search. 
    app.findGrepPreferences = NothingEnum.nothing;


    //$.writeln(finds.length + "    finds.length");

    //remove all the existing
    myDocument.sections.everyItem().remove;


    if (finds.length > 0) { // something has been found

        // for the 1st found item display the name of the page where the 1st text frame (there can be several threaded frames) containing it is located

        for (var i = 0; i < finds.length; i++) {


            var pageNum = null;

            try {
                pageNum = parseInt(finds[i].parentTextFrames[0].parentPage.name);
            } catch (myError) { }


            if (pageNum != null && pageNum >= 3) {
                $.writeln("pageNum " + pageNum);
                var sectionContents = finds[i].contents;
                //rever ultimo character da string
                sectionContents = sectionContents.slice(0, -1);

                app.activeDocument.sections.add({
                    pageStart: myDocument.pages.item(pageNum - 1),
                    marker: sectionContents
                    //name: "sec" + i
                });
            }


            // if (finds[i].contents.length - 1 >= 5) { //se for texto vai adicionar marker
            //     //var pageNum = parseInt(finds[i].parentTextFrames[0].parentPage.name);
            //     //var sectionContents = finds[i].contents;

            //     //$.writeln("pageNum " + pageNum + " ---- " + typeof (pageNum));
            //     //$.writeln("sectionContents " + sectionContents + " ---- " + typeof (sectionContents));

            //     //Add new section markers
            //     // myDocument.sections.add({
            //     //     pageStart: myDocument.pages.item(pageNum),
            //     //     marker: sectionContents,
            //     //     name: "sec" + i
            //     // });

            //     //}


            //     $.writeln(finds[i].contents);

            //     $.writeln("finds[i].parent " + finds[i].parentTextFrames[0]);

            //     //$.writeln("Found " + finds.length + " items, the " + (i + 1) + " is on page -> " + finds[i].parentTextFrames[0].parentPage.name);
            //     $.writeln("4");
            // }
        }


    }

    app.activeDocument.sections[1].continueNumbering = false;
    app.activeDocument.sections[1].pageNumberStart = 1;
}
