const { cloudinary } = require("../config");
const { connect, disconnect } = require("../database/dbconnection");
const imagesRepository = require("../repository/images.repo");

const deleteImage = async (req, res) => {
  const { public_id } = req.body;
  let connection;

  try {
    connection = await connect();
    if (!public_id) {
      disconnect(connection);
      res.status(400).json({ status: "Error", message: "public_id required" });
    }
  } catch (err) {
    console.error(err);
    disconnect(connection);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }

  imagesRepository
    .deleteImages(connection, public_id)
    .then(async () => {

      try {
        await cloudinary.uploader.destroy(public_id, {
          folder: process.env.CLOUDINARY_FOLDER_IMAGES,
        });
        res.json({ status: "Ok", message: "Image deleted successfully" });
      } catch (error) {
        res
          .status(500)
          .json({ status: "Error", message: "Internal server error" });
      }

    })
    .catch(() => {
      res
        .status(500)
        .json({ status: "Error", message: "Internal server error" });
    })
    .finally(() => disconnect(connection));
};

module.exports = deleteImage;
