const program = require('commander');

const File = require('./helpers/file');
const utils = require('./helpers/utils');
const createLogger = require('./helpers/logger');

const logger = createLogger();

program
  .version('0.0.1')
  .option('-f, --file <string>', 'File need to be imported, eg. data/<file_name.xlsx>')
  .option('-s, --schema <string>', 'Schema object needed for imported file, eg. schema/<schema_name>')
  .option('-c, --collection <string>', 'Collection to import data')
  .parse(process.argv);

const filePath = program.file;
if (!filePath) {
  logger.error('File path is required. Please run --help');
  process.exit(1);
}

const file = new File(filePath);
const isFileExists = file.isFileExists();

if (!isFileExists) {
  logger.error(`File "${filePath}" does not exists`);
  process.exit(1);
}

const schemaFilePath = program.schema;
if (!schemaFilePath) {
  logger.error('Schema is required. Please run --help');
  process.exit(1);
}

const schema = new File(schemaFilePath);
const isSchemaExists = schema.isFileExists();

if (!isSchemaExists) {
  logger.error(`Schema ${schemaFilePath} does not exists`);
  process.exit(1);
}

const collectionName = program.collection;
if (!collectionName) {
  logger.error('Collection name is required. Please run --help');
  process.exit(1);
}

const initializer = require('./libs/initializer');

const schemaObj = require(schema.fileAbsolutePath);
const schemaHelpers = require('./schema')(schemaObj);

initializer.start()
  .then(() => {
    return file.parse();
  })
  .then((rows) => {
    return schemaHelpers.mapFileRowsToSchemaRows(rows, schemaObj);
  })
  .then((mappedRows) => {
    const mongoDbInstance = initializer.getMongodbInstance();

    return schemaHelpers.bulkInsert(mongoDbInstance, collectionName, mappedRows);
  })
  .then(() => {
    return initializer.cleanup();
  })
  .then(() => {
    logger.info('Import data success');
    process.exit();
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
