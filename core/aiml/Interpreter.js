
/** @module core/aiml/Interpreter */

// Dependencies
var AIML = require("aiml");
var Messages = require("../logger/Messages");

/**
* Constructor de la capa intéprete de AIML.
* @constructor
* @param {object} config
*/
var Interpreter = (function() {
	var singleInstance,
	messages = new Messages();
	return function(config) {
		if ( singleInstance ) return singleInstance; 
		singleInstance = this;
		// NOT WORKING - Función asíncrona en código de planteamiento síncrono.
		AIML.parseDir(config.interpreter.directory, function(topics){
			messages.debug("Creating AIMLEngine...");
			var interpreter = new AIML.AiEngine("Default", topics, config.interpreter.data);
			messages.debug("Engine created.");
		});
		
		/**
		 * Obtiene el intéprete.
		 * @access public
		 * @method getInterpreter
		 * @return interpreter
		 */
		this.getInterpreter = function(){
			return interpreter;
		};
	}  
})(); 

module.exports = Interpreter;