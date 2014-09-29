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
module.exports.reqGoogleRoster = reqGoogleRoster;
module.exports.setStatusMessage = setStatusMessage;