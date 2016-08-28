module.exports = {
  mapFileRowsToSchemaRows(rows, schema) {
  	return rows.map((row) => {
  	  return this.mapFileRowToSchemaRow(row, schema);
  	});
  },

  mapFileRowToSchemaRow(row, schema) {
    const mappedRow = {};

  	Object.keys(row).map((key) => {
	  const mappedColumn = schema[key];

	  mappedRow[mappedColumn] = row[key];
  	});

  	return mappedRow;
  },

  bulkInsert(db, collectionName, params) {
  	return db.collection(collectionName).insertMany(params);
  }
};