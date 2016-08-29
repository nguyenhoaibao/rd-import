const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const xlsx = require('xlsx-to-json');

class File {
  constructor(filePath) {
    this.filePath = filePath;

    this.fileExtType = this.getFileExtType();
    this.fileAbsolutePath = this.getFileAbsolutePath();
  }

  getFileExtType() {
    try {
      return path.extname(this.filePath);
    } catch (e) {
      return '';
    }
  }

  getFileAbsolutePath() {
    try {
  	  return path.resolve(this.filePath);
  	} catch (e) {
  	  return '';
  	}
  }

  isFileExists() {
    if (!this.filePath && !this.fileAbsolutePath) {
  	  return false;
  	}

  	try {
  	  return fs.lstatSync(this.fileAbsolutePath).isFile();
  	} catch (e) {
      return false;
  	}
  }

  parse() {
    if (!this.fileExtType) {
      return Promise.reject(new Error(`Cannot recognize file ${this.filePath}`));
    }

    switch (this.fileExtType) {
      case '.xlsx':
        return this.parseXLSX();
      default:
        return Promise.reject(new Error(`File type ${this.fileExtType} is not supported`));
    }
  }

  parseXLSX() {
    return new Promise((resolve, reject) => {

      xlsx({ input: this.fileAbsolutePath, output: null }, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  }
}

module.exports = File;
