const mongodb = require('mongodb');
const Promise = require('bluebird');
const utils = require('../helpers/utils');

const MongoClient = mongodb.MongoClient;

const MONGODB_HOST = utils.getEnv('MONGODB_HOST');
const MONGODB_PORT = utils.getEnv('MONGODB_PORT');

const MONGODB_USERNAME = utils.getEnv('MONGODB_USERNAME');
const MONGODB_PASSWORD = utils.getEnv('MONGODB_PASSWORD');

const MONGODB_DBNAME = utils.getEnv('MONGODB_DBNAME');

const connectionUrl = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;

module.exports = {
  start() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(connectionUrl, (error, db) => {
        if (error) {
       	  return reject(error);
        }

        resolve(db);
      });
    });
  },

  getCollection(db, collectionName) {
  	return db.collection(collectionName);
  }
};
