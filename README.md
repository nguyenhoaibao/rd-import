## Import Data

### Setup
```
cp .env.example .env
npm install
```

### Environment Variables
```
APP_NAME=<app_name>

MONGODB_HOST=<mongodb_host>
MONGODB_PORT=<mongodb_port>
MONGODB_USERNAME=<mongodb_username>
MONGODB_PASSWORD=<mongodb_password>
MONGODB_DBNAME=<mongodb_dbname>
```

### Script Arguments
```
-f, --file Choose file to import, eg. data/<file_name.xlsx> (currently only support xlsx)
-s, --schema Choose schema to import, eg. schema/<schema_name>
-c, --collection Specify collection name to import data
```
