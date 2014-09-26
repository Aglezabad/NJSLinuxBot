'use strict';

var xmpp = require("node-xmpp");
var messages = require("../logger/Messages");
var services = require("./services.json");

function createClientFromConf(config, password){
	messages.debug("Calling createClientService(jid, password, service) from createClientConfig(config, password)...");
	return createClientFromSrv(config.client.id, password, config.client.service);
}

function createClientFromSrv(jid, password, service){
	messages.debug("Calling createClient(jid, password, host, port, reconnect) from createClientService(jid, password, service)...");
	switch(service){
		case "hangouts":
			messages.debug("Google Hangouts service.")
			return createClient(jid, password, services.hangouts.host, services.hangouts.port, services.hangouts.reconnect);
	}
}

function createClient(jid, password, host, port, reconnect){
	messages.info("Connecting to "+host+":"+port+"...");
	messages.debug("Creating client using "+jid+" at "+host+":"+port+"...");
	return new xmpp.Client({
		jid: jid,
		password: password,
		host: host,
		port: port,
		reconnect: reconnect
	});
}

module.exports.createClientFromConf = createClientFromConf;
module.exports.createClientFromSrv = createClientFromSrv;
module.exports.createClient = createClient;