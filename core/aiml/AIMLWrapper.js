var AIMLInterpreter = require("aimlinterpreter");
var Messages = require("../logger/Messages");

var interpreter;

function createInterpreter(config){
	if(interpreter !== null && interpreter !== undefined){
		Messages.warn("Interpreter already created. Use getInterpreter(). Skipping.");
	} else {
		Messages.debug("Creating AIMLInterpreter...");
		interpreter = new AIMLInterpreter(config.interpreter);
		Messages.debug("Interpreter created.");
		return interpreter;
	}
}

function getInterpreter(){
	if(interpreter !== null && interpreter !== undefined){
		return interpreter;
	} else {
		Messages.critical("No interpreter created before. Use createInterpreter() first.");
		throw "NoInterpreterCreatedException";
	}
}

module.exports.createInterpreter = createInterpreter;
module.exports.getInterpreter = getInterpreter;