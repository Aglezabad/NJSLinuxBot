'use strict';

// Dependencies
require("colors");

var Messages = (function() {
   var singleInstance;
   return function(logLevel) {
        if ( singleInstance ) return singleInstance; 
        singleInstance = this;
        var level = logLevel; // private
        // public methods
        this.greeting = function(appName, appVersion){
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
		};
		this.log = function(logLevel, message){
			//Check log level.
			var levels = ["critical", "error", "warn", "info", "debug"];
			//--If logLevel === level -> put message
			if(levels.indexOf(logLevel) <= levels.indexOf(level)){
				if(levels.indexOf(logLevel) <= levels.indexOf("error")){
					console.error((logLevel.toUpperCase() + ": ").red.bold + message);
				} else if(level.indexOf(level) === levels.indexOf("warn")){
					console.warn((logLevel.toUpperCase() + ": ").yellow.bold + message);
				} else {
					console.info((logLevel.toUpperCase() + ": ").bold + message);
				}
			}
		};
		this.debug = function(message){
			this.log("debug", message);
		};
		this.info = function(message){
			this.log("info", message);
		};
		this.warn = function(message){
			log("warn", message);
		};
		this.error = function(message){
			log("error", message);
		};
		this.critical = function(message){
			log("critical", message);
		};
    }  
})();

module.exports = Messages;
