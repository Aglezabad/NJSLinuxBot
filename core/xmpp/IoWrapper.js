'use strict';

// Dependencies
var Messages = require("../logger/Messages");
var ClientWrapper = require("./ClientWrapper");

// Variables
var client;

// Functions
function constructor(){
	client = ClientWrapper.getClient();
}

function readStanza(stanza){

	Messages.debug("Stanza: "+stanza.toString());

	if(stanza.attrs.type === "error"){
		Messages.error("XMPP Error: "+stanza.toString());
		return;
	}
	if(stanza.is("presence")){
		handlePresence(stanza);
		return;
	}
	if(stanza.is("message")){
		handleMessage(stanza);
		return;
	}
}

function handlePresence(stanza){
	var jid = ClientWrapper.createJID(stanza.attrs.from);

	if(stanza.attrs.type === null || stanza.attrs.type === undefined){
		stanza.attrs.type = "available";
	}

	switch(stanza.attrs.type){
		case "subscribe":
			Messages.info(jid.getLocal()+" suscribed to us.");
			client.send(ClientWrapper.createElement("presence", {
				from: client.jid.toString(),
				to: stanza.attrs.from,
				id: stanza.attrs.id,
				type: "subscribed"
			}));
			break;
		case "probe":
			Messages.debug("Probe received. Sending probe...");
			client.send(ClientWrapper.createElement("presence",{
				from: client.jid.toString(),
				to: stanza.attrs.from,
				id: stanza.attrs.id
			}));
			Messages.debug("Probe sent.");
			break;
		case "chat":
			Messages.debug("Chat presence received. Sending response...");
			client.send(ClientWrapper.createElement("presence",{
				to: stanza.attrs.from+"/"+stanza.attrs.to
			}));
			Messages.debug("Response sent.");

	}
}

function handleMessage(stanza){
	// Swap addresses...
	stanza.attrs.to = stanza.attrs.from;
	delete stanza.attrs.from;
	// and send back
	Messages.info('Sending response: ' + stanza.root().toString());
	client.send(stanza);
}

function reqGoogleRoster(){
	client.send(ClientWrapper.createElement("iq", { from: client.jid, type: "get", id: "google-roster"})
		.c("query", {xmlns: "jabber:iq:roster", "xmlns:gr": "google:roster", "gr:ext": "2" }));
}

function setStatusMessage(statusMessage){
	client.send(ClientWrapper.createElement("presence", { })
		.c("show").t("chat").up()
		.c("status").t(statusMessage));
}

module.exports = constructor;
module.exports.readStanza = readStanza;
module.exports.reqGoogleRoster = reqGoogleRoster;
module.exports.setStatusMessage = setStatusMessage;