const mongodb = require('./mongodb');

const dbs = {};

module.exports = {
  start() {
  	return this.startMongoDb()
  	  .then((mongodbInstance) => {
  	  	dbs.mongodb = mongodbInstance;
  	  })
  	  .catch((error) => {
  	  	return Promise.reject(error);
  	  });
  },

  startMongoDb() {
  	return mongodb.start();
  },

  getMongodbInstance() {
  	if (!dbs.mongodb) {
      return Promise.reject(new Error('Cannot get mongodb instance'));
  	}

  	return dbs.mongodb;
  },

  cleanup() {
    return this.stopMongoDb();
  },

  stopMongoDb() {
    return dbs.mongodb.close();
  }
};
