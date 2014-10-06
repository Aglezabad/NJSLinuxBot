'use strict';

//Dependencies
var Client = require("node-xmpp-client");
var JID = require("node-xmpp-core").JID;
var LTX = require("ltx");
var messages = new require("../logger/Messages")();
var Services = require("./services.json");

// Constants

var ClientWrapper = (function() {
   var singleInstance;
   return function(config, password) {
        if ( singleInstance ) return singleInstance; 
        singleInstance = this;
        // private constants
        const DEFAULT_SOCKET_TIMEOUT = 60000;
		const DEFAULT_KEEPALIVE_SET = true;
		const DEFAULT_KEEPALIVE_TIMEOUT = 30000;
		// Adding password to config.
        messages.debug("Setting password to config...");
		config.client.password=password;
		// Adding  host and port to config.
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
		// private variable
		messages.info("Connecting to "+config.client.host+":"+config.client.port+"...");
		messages.debug("Creating client using "+config.client.jid+" at "+config.client.host+":"+config.client.port+"...");
		var client = new Client(config.client);
		messages.debug("Client created.");		
        this.getClientInstance = function(){
        	return client;
        };
        this.setTimeout = function(timeout){
        	messages.debug("Setting client timeout...");
        	client.connection.socket.setTimeout(timeout || DEFAULT_SOCKET_TIMEOUT);
        	messages.debug("Client timeout set.");
        };
        this.setKeepAlive = function(enable, time){
        	messages.debug("Setting client keepalive...");
        	client.connection.socket.setKeepAlive(enable || DEFAULT_KEEPALIVE_SET, time || DEFAULT_KEEPALIVE_TIMEOUT);
        	messages.debug("Setting client keepalive...");
        }
    }  
})(); 

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