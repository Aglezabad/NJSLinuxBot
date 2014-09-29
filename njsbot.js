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
	client.connection.socket.setTimeout(0);
	client.connection.socket.setKeepAlive(true, 10000);
	IoWrapper();

	client.on('online', function() {
		Messages.info("Client chat is online.");
		IoWrapper.setStatusMessage(Config.statusMessage);
		IoWrapper.reqGoogleRoster();
	});

	client.on('stanza', function(stanza) {
		Messages.info("Stanza is: "+stanza);
		if (stanza.is('message') &&
			// Important: never reply to errors!
			(stanza.attrs.type !== 'error')) {
			// Swap addresses...
			stanza.attrs.to = stanza.attrs.from;
			delete stanza.attrs.from;
			// and send back
			Messages.info('Sending response: ' + stanza.root().toString());
			client.send(stanza);
		}
	});

	client.on('error', function(e) {
		Messages.error(e);
	});

}

startBot();