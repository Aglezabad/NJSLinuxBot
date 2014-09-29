'use strict';

// Dependencies
require("colors");

// Variables
var logLevel;

function constructor(level, locale){
	logLevel = level;
}

function greeting(appName, appVersion){
	console.log("=========================================".bold);
	console.log(" _   _    ___ _____  ______       _   \n".bold+
		"| \\ | |  |_  /  ___| | ___ \\     | |  \n".bold+
		"|  \\| |    | \\ `--.  | |_/ / ___ | |_ \n".bold+
		"| . ` |    | |`--. \\ | ___ \\/ _ \\| __|\n".bold+
		"| |\\  |/\\__/ /\\__/ / | |_/ / (_) | |_ \n".bold+
		"\\_| \\_/\\____/\\____/  \\____/ \\___/ \\__|\n".bold);                                      
	console.log("-----------------------------------------".bold);                                         
	console.log((appName+ "\t Version: " +appVersion).bold);
	console.log("=========================================".bold);
}

function log(level, message){
	//Check log level.
	var levels = ["critical", "error", "warn", "info", "debug"];
	//--If logLevel === level -> put message
	if(levels.indexOf(level) <= levels.indexOf(logLevel)){
		if(levels.indexOf(level) <= levels.indexOf("error")){
			console.error((level.toUpperCase() + ": ").red.bold + message);
		} else if(level.indexOf(level) === levels.indexOf("warn")){
			console.warn((level.toUpperCase() + ": ").yellow.bold + message);
		} else {
			console.info((level.toUpperCase() + ": ").bold + message);
		}
	}
}

function debug(message){
	log("debug", message);
}

function info(message){
	log("info", message);
}

function warn(message){
	log("warn", message);
}

function error(message){
	log("error", message);
}

function critical(message){
	log("critical", message);
}

module.exports = constructor;
module.exports.greeting = greeting;
module.exports.log = log;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.critical = critical;
