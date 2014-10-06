'use strict';

// Pre-dependencies
var Messages = require("./core/logger/Messages");

// Configurations
var config = require("./config.json");
var pack = require("./package.json");

// Functions
function startBot(){
	var messages = new Messages(process.env.LEVEL || config.level);
	messages.greeting(pack.name, pack.version);

	messages.debug("Loading dependencies...");
	var ClientWrapper = require("./core/xmpp/ClientWrapper");
	var AIMLWrapper = require("./core/aiml/AIMLWrapper");
	var IoWrapper = require("./core/xmpp/IoWrapper");
	messages.debug("Dependencies loaded.");

	var client = new ClientWrapper(config, process.env.PASSWORD).getClient();
	var interpreter = AIMLWrapper.createInterpreter(config);
	IoWrapper();

	interpreter.loadAIMLFilesIntoArray(['./aiml/greetings.aiml.xml']);

	client.on('online', function(){
		IoWrapper.online(config);
	});

	client.on('stanza', IoWrapper.readStanza);

	client.on('error', function(e) {
		messages.error(e);
	});

}

startBot();