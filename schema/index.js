module.exports = function (schema) {
  return {
    mapFileRowsToSchemaRows(rows) {
      return rows.map(row => this.mapFileRowToSchemaRow(row));
    },

    mapFileRowToSchemaRow(row) {
      const mappedRow = {};

    	Object.keys(row).map((key) => {
  	    const mappedColumn = schema[key];

        if (mappedColumn) {
          mappedRow[mappedColumn] = row[key];
        }
    	});

    	return mappedRow;
    },

    bulkInsert(db, collectionName, params) {
    	return db.collection(collectionName).insertMany(params);
    }
  }
};
