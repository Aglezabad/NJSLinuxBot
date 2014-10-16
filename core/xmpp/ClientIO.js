'use strict';

/** @module core/xmpp/ClientIO */

// Dependencies
var Messages = require("../logger/Messages");
var Client = require("./Client");
var Interpreter = require("../aiml/Interpreter");
var Element = require("./Element");
var JID = require("./JID");

var ClientIO = (function() {
	var singleInstance,
	messages = new Messages();
	return function() {
		if ( singleInstance ) return singleInstance; 
		singleInstance = this;
		// private variables
		var client = new Client().getClient(),
		interpreter = new Interpreter().getInterpreter();
		// private methods
		/**
		 * Procesa los mensajes presencia de XMPP.
		 * @access private
		 * @method handlePresence
		 * @param {} stanza
		 * @return void
		 */
		var handlePresence = function(stanza){
			var jid = JID(stanza.attrs.from);

			if(stanza.attrs.type === null || stanza.attrs.type === undefined){
				stanza.attrs.type = "available";
			}

			switch(stanza.attrs.type){
				case "subscribe":
					messages.info(jid.getLocal()+" suscribed to us.");
					client.send(Element("presence", {
						from: client.jid.toString(),
						to: stanza.attrs.from,
						id: stanza.attrs.id,
						type: "subscribed"
					}));
					break;
				case "probe":
					messages.debug("Probe received. Sending probe...");
					client.send(Element("presence",{
						from: client.jid.toString(),
						to: stanza.attrs.from,
						id: stanza.attrs.id
					}));
					messages.debug("Probe sent.");
					break;
				case "chat":
					messages.debug("Chat presence received. Sending response...");
					client.send(Element("presence",{
						to: stanza.attrs.from+"/"+stanza.attrs.to
					}));
					messages.debug("Response sent.");
			}
		};

		/**
		 * Procesa los mensajes estándar de XMPP.
		 * @access private
		 * @method handleMessage
		 * @param {} stanza
		 * @return void
		 */
		var handleMessage = function(stanza){
			var jid = JID(stanza.attrs.from);

			if(stanza.getChild("body") !== null && stanza.getChild("body") !== undefined){
				messages.debug("Child: "+stanza.getChild("body")+" | ChildText: "+stanza.getChildText("body"));
				interpreter.reply({name: jid.getLocal()}, stanza.getChildText("body"), function(err, answer){
					messages.debug("Error: "+err+" | Answer: "+answer);
					singleInstance.sendMessage(stanza.attrs.from, answer);
				});
			}
		};

		/**
		 * Envía una petición de tipo Google roster para mostrar la lista de clientes que solicitan conversación con el bot.
		 * @access private
		 * @method reqGoogleRoster
		 * @return void
		 */
		var reqGoogleRoster = function(){
			client.send(Element("iq", { from: client.jid, type: "get", id: "google-roster"})
				.c("query", {xmlns: "jabber:iq:roster", "xmlns:gr": "google:roster", "gr:ext": "2" }));
		};

		// public methods
		/**
		 * Asigna un mensaje de estado al bot, que será mostrado en el chat.
		 * @access public
		 * @method setStatusMessage
		 * @param {} statusMessage
		 * @return void
		 */
		this.setStatusMessage = function(statusMessage){
			client.send(Element("presence", { })
				.c("show").t("chat").up()
				.c("status").t(statusMessage));
		};

		/**
		 * Realiza las tareas pertinentes tras recibir el estado "conectado".
		 * @access public
		 * @method online
		 * @param {} config
		 * @return void
		 */
		this.online = function(config){
			messages.info("Client chat is online.");
			this.setStatusMessage(config.statusMessage);
			reqGoogleRoster();

			// Check roster every keepAlive
			setInterval(reqGoogleRoster, config.client.keepAlive.time);
		};
		
		/**
		 * Clasifica los mensajes recibidos según tipo.
		 * @access public
		 * @method readStanza
		 * @param {} stanza
		 * @return void
		 */
		this.readStanza = function(stanza){
			messages.debug("Stanza: "+stanza.toString());

			if(stanza.attrs.type === "error"){
				messages.error("XMPP Error: "+stanza.toString());
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
		};

		/**
		 * Realiza el envío de strings como mensajes XMPP a un usuario concreto.
		 * @access public
		 * @method sendMessage
		 * @param {} toJid
		 * @param {} messageBody
		 * @return void
		 */
		this.sendMessage = function(toJid, messageBody){
			var message = Element("message", {to: toJid, type: "chat"})
				.c("body").t(messageBody);
			messages.debug('Sending response: ' + message.toString());
			client.send(message);
		}
	}  
})(); 


module.exports = ClientIO;