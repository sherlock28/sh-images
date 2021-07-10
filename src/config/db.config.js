module.exports = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_DATABASE || "testsh",
  dialect: process.env.DB_DIALECT || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};
