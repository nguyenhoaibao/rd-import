const Promise = require('bluebird');
const xlsx = require('xlsx-to-json');

module.exports = function parseFile(file) {
  return new Promise((resolve, reject) => {

    xlsx({ input: file, output: null }, (error, result) => {
      if (error) {
      	return reject(error);
      }

      resolve(result);
    });
  });
}