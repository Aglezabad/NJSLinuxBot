'use strict';

// First dependencies
var logger = require('./core/logger');

// Functions
/**
 * Función principal que inicia el bot.
 * @access public
 * @method startBot
 * @return void
 */
function startBot(){
	logger.info("Loading dependencies...");
	logger.info("Dependencies loaded.");
}

module.exports = startBot;