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
        /**
         * Envía por salida el saludo de la aplicación.
         * @method greeting
         * @param {} appName
         * @param {} appVersion
         * @return void
         */
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
		/**
		 * Envía por salida un mensaje en un nivel concreto.
		 * @method log
		 * @param {} logLevel
		 * @param {} message
		 * @return void
		 */
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
		/**
		 * Envía un mensaje a la salida como depuración.
		 * @method debug
		 * @param {} message
		 * @return void
		 */
		this.debug = function(message){
			this.log("debug", message);
		};
		/**
		 * Envía un mensaje a la salida como información.
		 * @method info
		 * @param {} message
		 * @return void
		 */
		this.info = function(message){
			this.log("info", message);
		};
		/**
		 * Envía un mensaje a la salida como advertencia.
		 * @method warn
		 * @param {} message
		 * @return void
		 */
		this.warn = function(message){
			log("warn", message);
		};
		/**
		 * Envía un mensaje a la salida de errores como error.
		 * @method error
		 * @param {} message
		 * @return void
		 */
		this.error = function(message){
			log("error", message);
		};
		/**
		 * Envía un mensaje a la salida de errores como fallo crítico.
		 * @method critical
		 * @param {} message
		 * @return void
		 */
		this.critical = function(message){
			log("critical", message);
		};
    }  
})();

module.exports = Messages;
