'use strict';

/** @module core/logger/Messages */

// Dependencies
require("colors");

/**
* Constructor de la clase de envío de mensajes.
* @constructor
* @param {string} logLevel
*/
var Messages = (function() {
   var singleInstance;
   return function(logLevel) {
        if ( singleInstance ) return singleInstance; 
        singleInstance = this;
        var level = logLevel; // private
        // public methods
        /**
         * Envía por salida el saludo de la aplicación.
         * @access public
         * @method greeting
         * @param {string} appName
         * @param {string} appVersion
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
		 * @access public
		 * @method log
		 * @param {string} logLevel
		 * @param {string} message
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
		 * @access public
		 * @method debug
		 * @param {string} message
		 * @return void
		 */
		this.debug = function(message){
			this.log("debug", message);
		};
		/**
		 * Envía un mensaje a la salida como información.
		 * @access public
		 * @method info
		 * @param {string} message
		 * @return void
		 */
		this.info = function(message){
			this.log("info", message);
		};
		/**
		 * Envía un mensaje a la salida como advertencia.
		 * @access public
		 * @method warn
		 * @param {string} message
		 * @return void
		 */
		this.warn = function(message){
			log("warn", message);
		};
		/**
		 * Envía un mensaje a la salida de errores como error.
		 * @access public
		 * @method error
		 * @param {string} message
		 * @return void
		 */
		this.error = function(message){
			log("error", message);
		};
		/**
		 * Envía un mensaje a la salida de errores como fallo crítico.
		 * @access public
		 * @method critical
		 * @param {string} message
		 * @return void
		 */
		this.critical = function(message){
			log("critical", message);
		};
    }  
})();

module.exports = Messages;
