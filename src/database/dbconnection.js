const mysql = require("mysql2/promise");
const { db_config } = require("../config");

async function connect() {
  console.log("db connected");
  return await mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
  });
}

async function disconnect(connection) {
  console.log("db disconnected");
  await connection.end();
}

module.exports = { connect, disconnect };
