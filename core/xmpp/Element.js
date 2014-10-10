"use strict";

var Messages = require("../logger/Messages");
var LTX = require("ltx");

var messages = new Messages();

/**
 * Factoría de objetos Element, necesarios para el envío por XMPP.
 * @method Element
 * @param {} name
 * @param {} attrs
 * @return NewExpression
 */
function Element(name, attrs){
	attrs=attrs||{};
	messages.debug("Creating element with name: "+name+" and attributes: "+attrs.toString()+".");
	return new LTX.Element(name, attrs);
}

module.exports = Element;