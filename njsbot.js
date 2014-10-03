'use strict';

// Pre-dependencies
var Messages = require("./core/logger/Messages");

// Configurations
var config = require("./config.json");
var pack = require("./package.json");

// Functions
function startBot(){
	Messages(process.env.LEVEL || config.level, process.env.LOCALE || config.locale);
	Messages.greeting(pack.name, pack.version);

	Messages.debug("Loading dependencies...");
	var ClientWrapper = require("./core/xmpp/ClientWrapper");
	var AIMLWrapper = require("./core/aiml/AIMLWrapper");
	var IoWrapper = require("./core/xmpp/IoWrapper");
	Messages.debug("Dependencies loaded.");

	var client = ClientWrapper.createClient(config, process.env.PASSWORD);
	var interpreter = AIMLWrapper.createInterpreter(config);
	IoWrapper();

	interpreter.loadAIMLFilesIntoArray(['./aiml/greetings.aiml.xml']);

	client.on('online', function(){
		IoWrapper.online(config);
	});

	client.on('stanza', IoWrapper.readStanza);

	client.on('error', function(e) {
		Messages.error(e);
	});

}

startBot();