"use strict";

/** @module core/xmpp/Element */

var Messages = require("../logger/Messages");
var LTX = require("ltx");

var messages = new Messages();

/**
 * Factoría de objetos Element, necesarios para el envío por XMPP.
 * @constructor
 * @param {string} name
 * @param {object} attrs
 * @return NewExpression
 */
function Element(name, attrs){
	attrs=attrs||{};
	messages.debug("Creating element with name: "+name+" and attributes: "+attrs.toString()+".");
	return new LTX.Element(name, attrs);
}

module.exports = Element;