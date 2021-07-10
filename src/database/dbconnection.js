const mysql = require("mysql");
const { db_config } = require("../config");

const mysqlConnection = mysql.createConnection({
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
});

mysqlConnection.connect(err => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("MySQL connected");
  }
});

module.exports = mysqlConnection;
