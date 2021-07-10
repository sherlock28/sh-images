const db_development = {
  host: process.env.DB_DEV_HOST || "localhost",
  port: process.env.DB_DEV_PORT || 3306,
  database: process.env.DB_DEV_DATABASE || "testsh",
  dialect: process.env.DB_DEV_DIALECT || "mysql",
  user: process.env.DB_DEV_USER || "root",
  password: process.env.DB_DEV_PASSWORD || "",
};

const db_production = {
  host: process.env.DB_PRO_HOST || "localhost",
  port: process.env.DB_PRO_PORT || 3306,
  database: process.env.DB_PRO_DATABASE || "testsh",
  dialect: process.env.DB_PRO_DIALECT || "mysql",
  user: process.env.DB_PRO_USER || "root",
  password: process.env.DB_PRO_PASSWORD || "",
};

const db_config =
  process.env.NODE_ENV === "production" ? db_production : db_development;

module.exports = db_config;
