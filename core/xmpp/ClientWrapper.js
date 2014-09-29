'use strict';

//Dependencies
var Client = require("node-xmpp-client");
var LTX = require("ltx");
var Messages = require("../logger/Messages");
var Services = require("./services.json");

// Variables
var xmppClient;

// Functions
function createClient(config, password){
	if(xmppClient !== undefined && xmppClient !== null){
		Messages.warn("Client already created. Use getClient(). Skipping.");
	} else {
		Messages.debug("Setting password to config...");
		config.client.password=password;
		Messages.debug("Setting host and port from services...");
		switch(config.client.service){
			case "hangouts":
				Messages.debug("Service: Google Hangouts.");
				config.client.host=Services.hangouts.host;
				config.client.port=Services.hangouts.port;
				break;

			case undefined:
				Messages.debug("Service: No service.");
				Messages.debug("Default host and port or assigned manually.");
				break;
		}
		Messages.info("Connecting to "+config.client.host+":"+config.client.port+"...");
		Messages.debug("Creating client using "+config.client.jid+" at "+config.client.host+":"+config.client.port+"...");
		xmppClient = new Client(config.client);
		Messages.debug("Client created.");
		return xmppClient;
	}
}

function getClient(){
	if(xmppClient !== undefined && xmppClient !== null){
		return xmppClient;
	} else {
		Messages.critical("No client created before. Use createClient() first.");
		throw "NoClientCreatedException";
	}
}

function createElement(name, attrs){
	attrs=attrs||{};
	Messages.debug("Creating element with name: "+name+" and attributes: "+attrs.toString()+"...");
	return new LTX.Element(name, attrs);
}

module.exports.createClient = createClient;
module.exports.getClient = getClient;
module.exports.createElement = createElement;