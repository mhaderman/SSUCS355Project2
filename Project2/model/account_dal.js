var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);






//ACCOUNT TABLE IN DATA BASE has a capital "Account"