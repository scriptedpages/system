//Correr o sistema a partir deste script

var script_file = File($.fileName); // get the location of the script file
var script_file_path = script_file.path; // get the path
//$.writeln("script_file_path " + script_file_path);

function runSystem() {
    var this_script_file = File($.fileName); // get the location of the script file
    var this_script_file_path = this_script_file.path; // get the path

    var global = File(this_script_file_path + "/system/master.jsx");
    app.doScript(global);
}
runSystem();