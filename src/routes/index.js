const router = require("express").Router();
const { postImages, deleteImage } = require("../controllers");

router.post("/image", postImages);
router.delete("/image", deleteImage);

module.exports = router;
