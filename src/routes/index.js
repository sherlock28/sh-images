const router = require("express").Router();
const { postImages, deleteImage, postAvatarImage } = require("../controllers");

router.post("/images", postImages);
router.delete("/images", deleteImage);
router.post("/images/avatar", postAvatarImage);
router.get("/", (req, res) => res.json({
    api: "post-images",
    description: "API to upload images to a cloudinary folder",
    version: "v1"
}));

module.exports = router;
