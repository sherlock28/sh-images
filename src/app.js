require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// initializations
const app = express();
// require("./database");

// settings
app.set("port", process.env.PORT || 4000);

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
app.use(multer({ storage }).single("image"));

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// routes
app.use("/api/v1", require("./routes"));
// app.use(require("./middlewares").errors.notFound);
// app.use(require("./middlewares").errors.handleError);

module.exports = app;
