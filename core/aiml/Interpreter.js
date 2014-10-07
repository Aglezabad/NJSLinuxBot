var AIMLInterpreter = require("aimlinterpreter");
var Messages = require("../logger/Messages");

var Interpreter = (function() {
	var singleInstance,
	messages = new Messages();
	return function(config) {
		if ( singleInstance ) return singleInstance; 
		singleInstance = this;
		messages.debug("Creating AIMLInterpreter...");
		var interpreter = new AIMLInterpreter(config.interpreter);
		messages.debug("Interpreter created.");
		this.getInterpreter = function(){
			return interpreter;
		};
	}  
})(); 

module.exports = Interpreter;