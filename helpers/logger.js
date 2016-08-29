const bunyan = require('bunyan');
const utils = require('./utils');

const APP_NAME = utils.getEnv('APP_NAME');
const loggers = {};

module.exports = function createLogger({ name = APP_NAME } = {}) {
  if (!name) {
    throw new Error('Application name (APP_NAME) is not configured');
  }

  if (loggers[name]) return loggers[name];

  const logger = bunyan.createLogger({
    name,
    streams: [
      {
        level: 'trace',
        stream: process.stdout
      }
    ]
  });

  loggers[name] = logger;

  return logger;
};
