
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
		var setTopicsOutsideCallback = function(topics){
			aimlTopics = topics;
		}
		AIML.parseDir(config.interpreter.directory, function(err, topics){
			setTopicsOutsideCallback(topics);
		});
		var aimlTopics
		messages.debug("Creating AIMLEngine...");
		var interpreter = new AIML.AiEngine("Default", aimlTopics, config.interpreter.data);
		messages.debug("Engine created.");
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