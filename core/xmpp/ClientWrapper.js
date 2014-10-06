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

var messages = Messages.getInstance();

function ClientWrapper(config, password){
	messages.debug("Setting password to config...");
	config.client.password=password;
	messages.debug("Setting host and port from services...");
	switch(config.client.service){
		case "hangouts":
			messages.debug("Service: Google Hangouts.");
			config.client.host=Services.hangouts.host;
			config.client.port=Services.hangouts.port;
			break;

		case undefined:
			messages.debug("Service: No service.");
			messages.debug("Default host and port or assigned manually.");
			break;
	}
	messages.info("Connecting to "+config.client.host+":"+config.client.port+"...");
	messages.debug("Creating client using "+config.client.jid+" at "+config.client.host+":"+config.client.port+"...");
	this.client = new Client(config.client);
	messages.debug("Client created.");
	messages.debug("Setting client timeout and keepalive...");
	client.connection.socket.setTimeout(config.client.timeout || DEFAULT_SOCKET_TIMEOUT);
	client.connection.socket.setKeepAlive(config.client.keepAlive.set || DEFAULT_KEEPALIVE_SET, config.client.keepAlive.time || DEFAULT_KEEPALIVE_TIMEOUT);
	messages.debug("Client timeout and keepalive set.");
}

ClientWrapper.getInstance = function(){
	return this;
}

ClientWrapper.prototype.getClient = function(){
	return this.client;
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

module.exports = ClientWrapper;