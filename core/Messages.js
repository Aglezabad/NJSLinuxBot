'use strict';

require("colors");
var i18n = require("i18n");

var logLevel;

function constructor(level, locale){
	logLevel = level;
	i18n.configure({
	    locales:['en', 'es'],
	    directory: '../locales',
	    defaultLocale: locale
	});
}

function greeting(appName, appVersion){
	console.log("------------------------------------------------------".bold);
	console.log(appName.bold+"\t Version".bold+appVersion.bold);
	console.log("------------------------------------------------------".bold);
}

function log(level, message){
	//Check log level.
	var levels = ["critical", "error", "warn", "info", "debug"];
	//--If logLevel === level -> put message
	if(levels.indexOf(level) >= levels.indexOf(logLevel)){
		if(levels.indexOf(level) >= levels.indexOf("error")){
			console.error(level.toUpperCase().red.bold + ": " + i18n.__(message), arguments);
		} else if(level.indexOf(level) === levels.indexOf("warn")){
			console.warn(level.toUpperCase().yellow.bold + ": " + i18n.__(message), arguments);
		} else {
			console.info(level.toUpperCase().bold + ": " + i18n.__(message), arguments);
		}
	}
}

function debug(message){
	log("debug", message, arguments);
}

function info(message){
	log("info", message, arguments);
}

function warn(message){
	log("warn", message, arguments);
}

function error(message){
	log("error", message, arguments);
}

function critical(message){
	log("critical", message, arguments);
}

module.exports = constructor;
module.exports.greeting = greeting();
module.exports.log = log;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.critical = critical;
