//From ->  https://indisnip.wordpress.com/2010/08/08/create-customized-menu/
// and http://www.indiscripts.com/post/2010/02/how-to-create-your-own-indesign-menus

//#targetengine "Scripted Pages";
#targetengine "InDesign";

var script_file = File($.fileName); // get the location of the script file
var script_file_path = script_file.path; // get the path


//$.writeln("script_file_path 2 ");


var myFolder = Folder(app.activeScript.path);
myFolder = myFolder.parent.parent;
//myFolder = myFolder.parent.parent + '/Scripts Panel/Tese';

// var menuItem1Handler = function ( /*onInvoke*/) {
//     app.doScript(File(myFolder + '/runSystem.jsx'));
// };

var menuItem1Handler = function ( /*onInvoke*/) {
    app.doScript(File('/Applications/Adobe%20InDesign%20CC%202019/Scripts/Scripts%20Panel/Scripted%20Pages/runSystem.jsx'));
};

// var menuItem2Handler = function ( /*onInvoke*/) {
//     app.doScript(File(myFolder + '/MyTest2.jsx'));
// };

var menuItem2HandlerDisplay = function ( /*beforeDisplay*/) {
    subMenu2.enabled = false;
};

var menuItem3Handler = function ( /*onInvoke*/) {
    openWebsite("https://cdv.dei.uc.pt/2019/scriptedpages/");
};

var menuInstaller = menuInstaller || (function () {
    var menuItem1T = "Run Scripted Pages",
        //menuItem2T = "Diogo 2",
        menuItem3T = "About",
        menuT = "Scripted Pages",
        subs = app.menus.item("$ID/Main").submenus,
        sma,
        mnu;

    var refItem = app.menus.item("$ID/Main").submenus.item("$ID/&Window");
    //var refItem = app.menus.item("$ID/Main");

    subMenu1 = app.scriptMenuActions.add(menuItem1T);
    subMenu1.eventListeners.add("onInvoke", menuItem1Handler);

    // subMenu2 = app.scriptMenuActions.add(menuItem2T);
    // subMenu2.eventListeners.add("onInvoke", menuItem2Handler);
    // subMenu2.eventListeners.add("beforeDisplay", menuItem2HandlerDisplay);

    subMenu3 = app.scriptMenuActions.add(menuItem3T);
    subMenu3.eventListeners.add("onInvoke", menuItem3Handler);

    mnu = subs.item(menuT);
    if (!mnu.isValid) mnu = subs.add(menuT, LocationOptions.after, refItem);
    mnu.menuItems.add(subMenu1);
    // mnu.menuItems.add(subMenu2);
    mnu.menuSeparators.add();
    mnu.menuItems.add(subMenu3);
    return true;
})();



// //To remove
// try {
//     //app.menus.item("$ID/Main").submenus.item("$ID/&Help"); //quando é submenu
//     app.menus.item("$ID/Main").submenus.item("Scripted Pages").remove(); // quando é mesmo menu
//     //app.menus.item("$ID/Main").submenus.item("Diogo 6").remove(); // quando é mesmo menu
//     //app.menus.item("$ID/Main").submenus.item("Diogo 7").remove(); // quando é mesmo menu
// } catch (e) { }






function openWebsite(ws) {
    if (File.fs == "Macintosh") {
        var tempFile = File("~/Desktop/tempurl.webloc");
        tempFile.open("w");
        tempFile.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\ <!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\  <plist version=\"1.0\">\  <dict>\  <key>URL</key>\  <string>" + ws + "</string>\  </dict>\  </plist>");
        tempFile.close();
        tempFile.execute();
        for (var aux = 0; aux < 100; aux++) {
            $.sleep(10);
        }
        tempFile.remove();
    } else {
        var tempFile = File("~/Desktop/cuppascript.url");
        tempFile.open("w");
        tempFile.write("[InternetShortcut]\rURL=" + ws);
        tempFile.close();
        tempFile.execute();
        for (var aux = 0; aux < 100; aux++) {
            $.sleep(10);
        }
        tempFile.remove();
    }
}