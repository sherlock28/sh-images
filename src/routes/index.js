const router = require("express").Router();
const { postImages, deleteImage } = require("../controllers");

router.post("/images", postImages);
router.delete("/images", deleteImage);

module.exports = router;
