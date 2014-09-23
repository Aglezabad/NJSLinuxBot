'use strict';

var xmpp = require("node-xmpp");
var services = require("./services.json");

function createClient(config, password){
	return createClient(config.client.id, password, config.client.service);
}

function createClient(jid, password, service){
	switch(service){
		case "hangouts":
			return createClient(jid, password, services.hangouts.host, services.hangouts.port, services.hangouts.reconnect);
	}

	// var client = new xmpp.Client({
//     jid: argv[2],
//     password: argv[3],
//     host: "talk.google.com",
//     port: 5222,
//     reconnect: true
// });
}