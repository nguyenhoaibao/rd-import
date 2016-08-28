const fs = require('fs');
const path = require('path');

module.exports = {
  getEnv(key, defaultValue = '') {
  	return process.env[key] || defaultValue;
  },

  getFilePath(file) {
  	try {
  	  const filePath = path.resolve(file);
  	  return filePath;
  	} catch (e) {
  	  return false;	
  	}
  },

  isFileExists(filePath) {
  	if (!filePath) {
  	  return false;
  	}

  	try {
  	  const stats = fs.lstatSync(filePath);
  	  return stats.isFile();	
  	} catch (e) {
      return false;
  	}
  }
};