require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { env } = require("./config/env");

// initializations
const app = express();

// settings
app.set("port", env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).any("images"));

if (env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// routes
app.use("/api/v1", require("./routes"));
app.use(require("./middlewares").errors.notfound);
app.use(require("./middlewares").errors.handleErrors);

module.exports = app;
