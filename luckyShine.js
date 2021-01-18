// created by Michel Kalavanda at 20210117 21:02.
// 
// michelkalavanda@gmail.com
// +2348109916000

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mysql = require('mysql');

mysql.Promise = global.Promise;

// Connecting to the database
const connection = mysql.createConnection({
    host     : dbConfig.server,
    user     : dbConfig.user,
    password : dbConfig.pwd,
    database : dbConfig.db
  });

connection.connect(function(err) {
    if (err) {
      console.error('Could not connect to the database. Exiting now: ' + err.stack);
      process.exit();
    }
    console.log('Successfully connected to the database == ' + connection.threadId);
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "This is the entry point of LuckyShine Game", "responseCode": 200});
});

require('./app/routes/users.route.js')(app);
require('./app/routes/treasure.routes')(app);
// listen for requests
app.listen(3000, () => {
    console.log("LuckyShine app is listening on port 3000");
});