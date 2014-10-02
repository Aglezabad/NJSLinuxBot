'use strict';

//Dependencies
var Client = require("node-xmpp-client");
var JID = require("node-xmpp-core").JID;
var LTX = require("ltx");
var Messages = require("../logger/Messages");
var Services = require("./services.json");

// Constants
const DEFAULT_SOCKET_TIMEOUT=60000;
const DEFAULT_KEEPALIVE_SET=true;
const DEFAULT_KEEPALIVE_TIMEOUT=30000;

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
		Messages.debug("Setting client timeout and keepalive...");
		xmppClient.connection.socket.setTimeout(config.client.timeout || DEFAULT_SOCKET_TIMEOUT);
		xmppClient.connection.socket.setKeepAlive(config.client.keepAlive.set || DEFAULT_KEEPALIVE_SET, config.client.keepAlive.time || DEFAULT_KEEPALIVE_TIMEOUT);
		Messages.debug("Client timeout and keepalive set.");
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
	Messages.debug("Creating element with name: "+name+" and attributes: "+attrs.toString()+".");
	return new LTX.Element(name, attrs);
}

function createJID(attrs, beta, gamma){
	Messages.debug("Creating Jabber ID element.");
	return new JID(attrs, beta, gamma);
}

module.exports.createClient = createClient;
module.exports.getClient = getClient;
module.exports.createElement = createElement;
module.exports.createJID = createJID;