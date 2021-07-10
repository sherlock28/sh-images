const router = require("express").Router();
const { postImages, deleteImage } = require("../controllers");
// const { users, auth } = require("../middlewares");

router.post("/image", postImages);
router.delete("/image", deleteImage);

module.exports = router;
