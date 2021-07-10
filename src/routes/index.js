const router = require("express").Router();
const { postImages, deleteImage } = require("../controllers");

router.post("/image", postImages);
router.delete("/image/:id", deleteImage);

module.exports = router;
