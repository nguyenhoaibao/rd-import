const program = require('commander');
const util = require('./helpers/util');

program
  .version('0.0.1')
  .option('-f, --file <string>', 'File need to be imported')
  .option('-s, --schema <string>', 'Schema object needed for for imported file')
  .option('-c, --collection <string>', 'Collection to import data')
  .parse(process.argv);

const file = program.file;
if (!file) {
  console.log('File is required. Please run --help');
  process.exit(1);
}

const filePath = util.getFilePath(file);
const isFileExists = util.isFileExists(filePath);

if (!isFileExists) {
  console.log(`File "${file}" with path ${filePath} does not exists`);
  process.exit(1);
}

const schemaFile = program.schema;
if (!schemaFile) {
  console.log('Schema is required. Please run --help');
  process.exit(1);
}

const schemaFilePath = util.getFilePath(schemaFile);
const isSchemaExists = util.isFileExists(schemaFilePath);

if (!isSchemaExists) {
  console.log(`Schema ${schemaFile} with path ${schemaFilePath} does not exists`);
  process.exit(1);
}

const collectionName = program.collection;
if (!collectionName) {
  console.log('Collection name is required. Please run --help');
  process.exit(1);
}

const initializer = require('./libs/initializer');
const parseFile = require('./helpers/parseFile');
const schema = require('./schema');
const schemaObj = require(schemaFilePath);

initializer.start()
  .then(() => {
    return parseFile(filePath);
  })
  .then((rows) => {
    return schema.mapFileRowsToSchemaRows(rows, schemaObj);
  })
  .then((mappedRows) => {
    const db = initializer.getMongodbInstance();

    return schema.bulkInsert(db, collectionName, mappedRows);
  })
  .then(() => {
    return initializer.cleanup();
  })
  .then(() => {
    console.log('Import data success');
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

