
/** @module core/aiml/Interpreter */

// Dependencies
var AIMLInterpreter = require("aimlinterpreter");
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
		messages.debug("Creating AIMLInterpreter...");
		var interpreter = new AIMLInterpreter(config.interpreter);
		messages.debug("Interpreter created.");
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