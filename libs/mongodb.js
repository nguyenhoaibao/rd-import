const mongodb = require('mongodb');
const Promise = require('bluebird');
const util = require('../helpers/util');

const MongoClient = mongodb.MongoClient;

const MONGODB_HOST = util.getEnv('MONGODB_HOST');
const MONGODB_PORT = util.getEnv('MONGODB_PORT');
const MONGODB_DBNAME = util.getEnv('MONGODB_DBNAME');

const connectionUrl = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;

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