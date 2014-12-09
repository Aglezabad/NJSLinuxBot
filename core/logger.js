// Dependencies
var winston = require('winston');
var config = require('../config.json');

// Constants
const DEFAULT_LOGGER_LEVEL = 'info';
const DEFAULT_LOGGER_FILENAME = './njsbot.log';
const DEFAULT_LOGGER_EXCEPTION_FILENAME = './njsbot-exceptions.log';

// Logger
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			json: false,
			timestamp: true,
			colorize: true,
			level: process.env.LOGGER_LEVEL ||
				config.logger.level ||
				DEFAULT_LOGGER_LEVEL
		}),
		new (winston.transports.File)({
			timestamp: true,
			filename: process.env.LOGGER_FILENAME ||
				config.logger.filename ||
				DEFAULT_LOGGER_FILENAME
		})
	],
	exceptionHandlers: [
		new (winston.transports.Console)({
			json: false,
			timestamp: true,
			colorize: true
		}),
		new (winston.transports.File)({
			timestamp: true,
			filename: process.env.LOGGER_EXCEPTION_FILENAME ||
				config.logger.exception.filename ||
				DEFAULT_LOGGER_EXCEPTION_FILENAME
		})
	],
	exitOnError: false
});

module.exports = logger;