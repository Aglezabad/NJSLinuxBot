'use strict';

// Pre-dependencies
var Messages = require("./core/logger/Messages");

// Configurations
var Config = require("./config.json");
var Pack = require("./package.json");

// Functions
function startBot(){
	Messages(process.env.LEVEL || Config.level, process.env.LOCALE || Config.locale);
	Messages.greeting(Pack.name, Pack.version);

	Messages.debug("Loading dependencies...");
	var ClientWrapper = require("./core/xmpp/ClientWrapper");
	var IoWrapper = require("./core/xmpp/IoWrapper");
	Messages.debug("Dependencies loaded.");

	var client = ClientWrapper.createClient(Config, process.env.PASSWORD);
	IoWrapper();

	client.on('online', function() {
		Messages.info("Client chat is online.");
		IoWrapper.setStatusMessage(Config.statusMessage);
		IoWrapper.reqGoogleRoster();
	});

	client.on('stanza', IoWrapper.readStanza);

	client.on('error', function(e) {
		Messages.error(e);
	});

}

startBot();