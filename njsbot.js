'use strict';

var Messages = require("./core/logger/Messages"),

// Configurations
config = require("./config.json"),
pack = require("./package.json");

// Functions
/**
 * Función principal que inicia el bot.
 * @access public
 * @method startBot
 * @return void
 */
function startBot(){
	var messages = new Messages(process.env.LEVEL || config.level);
	messages.greeting(pack.name, pack.version);

	messages.debug("Loading dependencies...");
	var Client = require("./core/xmpp/Client"),
	Interpreter = require("./core/aiml/Interpreter"),
	ClientIO = require("./core/xmpp/ClientIO");
	messages.debug("Dependencies loaded.");

	var client = new Client(config, process.env.PASSWORD).getClient(),
	interpreter = new Interpreter(config).getInterpreter(),
	clientio = new ClientIO();

	interpreter.loadAIMLFilesIntoArray(config.interpreter.files);

	client.on('online', function(){
		clientio.online(config);
	});

	client.on('stanza', clientio.readStanza);

	client.on('error', function(e) {
		messages.error(e);
	});

}

startBot();