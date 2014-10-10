"use strict";

var Messages = require("../logger/Messages");
var JID = require("node-xmpp-core").JID;

var messages = new Messages();

/**
 * Factoría de objetos JID que guardan los datos de identificación de un usuario.
 * @method JIDElement
 * @param {} attrs
 * @param {} beta
 * @param {} gamma
 * @return NewExpression
 */
function JIDElement(attrs, beta, gamma){
	messages.debug("Creating Jabber ID element.");
	return new JID(attrs, beta, gamma);
}

module.exports = JIDElement;