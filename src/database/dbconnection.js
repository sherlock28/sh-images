const mysql = require("mysql2");
const { db_config } = require("../config");

module.exports = () => {
  return mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
  });
};
