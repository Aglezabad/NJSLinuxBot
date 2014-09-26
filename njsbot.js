'use strict';

//Dependencies
var messages = require("./core/logger/Messages");

//Configurations
var config = require("./config.json");
var pack = require("./package.json");

//function startBot: Función encargada de arrancar el bot
function startBot(){
	messages(process.env.LEVEL || config.level, process.env.LOCALE || config.locale);
	messages.greeting(pack.name, pack.version);

	messages.debug("Loading dependencies...");
	var xmppWrapper = require("./core/connector/XMPPWrapper");
	messages.debug("Dependencies loaded.");

	var client = xmppWrapper.createClientFromConf(config, process.env.PASSWORD);

	client.on('online', function() {
		messages.info("Client chat is online.");
		client.send(new xmpp.Element('presence', { })
		  .c('show').t('chat').up()
		  .c('status').t('Happily echoing your <message/> stanzas')
		)
	});

	client.on('stanza', function(stanza) {
		if (stanza.is('message') &&
			// Important: never reply to errors!
			(stanza.attrs.type !== 'error')) {
			// Swap addresses...
			stanza.attrs.to = stanza.attrs.from;
			delete stanza.attrs.from;
			// and send back
			messages.info('Sending response: ' + stanza.root().toString());
			client.send(stanza);
		}
	});

	client.on('error', function(e) {
		messages.error(e);
	});

}

startBot();

// /**
//  * Echo Bot - the XMPP Hello World
//  **/
// var xmpp = require("node-xmpp");
// var argv = process.argv;

// if (argv.length !== 4) {
//     console.error('Usage: node njsbot.js <my-jid> <my-password>');
//     process.exit(1);
// }

// var client = new xmpp.Client({
//     jid: argv[2],
//     password: argv[3],
//     host: "talk.google.com",
//     port: 5222,
//     reconnect: true
// });

// client.on('online', function() {
//     console.log('online')
//     client.send(new xmpp.Element('presence', { })
//       .c('show').t('chat').up()
//       .c('status').t('Happily echoing your <message/> stanzas')
//     )
// });

// client.on('stanza', function(stanza) {
//     if (stanza.is('message') &&
//       // Important: never reply to errors!
//       (stanza.attrs.type !== 'error')) {
//         // Swap addresses...
//         stanza.attrs.to = stanza.attrs.from;
//         delete stanza.attrs.from;
//         // and send back
//         console.log('Sending response: ' + stanza.root().toString());
//         client.send(stanza);
//     }
// });

// client.on('error', function(e) {
//     console.error(e);
// });