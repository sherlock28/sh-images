const router = require("express").Router();
const { postImages, deleteImage } = require("../controllers");

router.post("/image", postImages);
router.delete("/image/:public_id", deleteImage);

module.exports = router;
