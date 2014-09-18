'use strict';

require("colors");
var i18n = require("i18n");

var logLevel;

function constructor(level, locale){
	logLevel = level;
	i18n.configure({
	    locales:['en', 'es'],
	    directory: __dirname + '/../../locales',
	    defaultLocale: locale
	});
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
	console.log((appName+ i18n.__("\t Version: ") +appVersion).bold);
	console.log("=========================================".bold);
}

function printLog(level, message){
	//Check log level.
	var levels = ["critical", "error", "warn", "info", "debug"];
	//--If logLevel === level -> put message
	if(levels.indexOf(level) >= levels.indexOf(logLevel)){
		if(levels.indexOf(level) >= levels.indexOf("error")){
			console.error((level.toUpperCase() + ": ").red.bold + i18n.__(message));
		} else if(level.indexOf(level) === levels.indexOf("warn")){
			console.warn((level.toUpperCase() + ": ").yellow.bold + i18n.__(message));
		} else {
			console.info((level.toUpperCase() + ": ").bold + i18n.__(message));
		}
	}
}

function debug(message){
	printLog("debug", message);
}

function info(message){
	printLog("info", message);
}

function warn(message){
	printLog("warn", message);
}

function error(message){
	printLog("error", message);
}

function critical(message){
	printLog("critical", message);
}

module.exports = constructor;
module.exports.greeting = greeting;
module.exports.printLog = printLog;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.critical = critical;
