var AIMLInterpreter = require("aimlinterpreter");
var messages = new require("../logger/Messages")();

var interpreter;

function createInterpreter(config){
	if(interpreter !== null && interpreter !== undefined){
		messages.warn("Interpreter already created. Use getInterpreter(). Skipping.");
	} else {
		messages.debug("Creating AIMLInterpreter...");
		interpreter = new AIMLInterpreter(config.interpreter);
		messages.debug("Interpreter created.");
		return interpreter;
	}
}

function getInterpreter(){
	if(interpreter !== null && interpreter !== undefined){
		return interpreter;
	} else {
		messages.critical("No interpreter created before. Use createInterpreter() first.");
		throw "NoInterpreterCreatedException";
	}
}

module.exports.createInterpreter = createInterpreter;
module.exports.getInterpreter = getInterpreter;