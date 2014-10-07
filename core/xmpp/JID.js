"use strict";

var Messages = require("../logger/Messages");
var JID = require("node-xmpp-core").JID;

var messages = new Messages();

function JIDElement(attrs, beta, gamma){
	messages.debug("Creating Jabber ID element.");
	return new JID(attrs, beta, gamma);
}

module.exports = JIDElement;