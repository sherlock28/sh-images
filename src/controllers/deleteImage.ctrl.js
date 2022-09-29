const { env } = require("../config/env");
const { cloudinary } = require("../config");
const { connect, disconnect } = require("../database/dbconnection");
const imagesRepository = require("../repository/images.repo");

const deleteImage = async (req, res) => {
  const { public_id } = req.body;
  let connection = null;

  try {
    if (env.ENABLE_SAVE_MYSQL) connection = await connect();
    if (!public_id) {
      if (env.ENABLE_SAVE_MYSQL) disconnect(connection);
      return res.status(400).json({ status: "Error", message: "public_id required" });
    }
  } catch (err) {
    console.error(err);
    if (env.ENABLE_SAVE_MYSQL) disconnect(connection);
    return res.status(500).json({ data: null, success: false, message: "Internal server error", error: err });
  }

  // #### deprecated ####
  if (env.ENABLE_SAVE_MYSQL) {
    imagesRepository
      .deleteImages(connection, public_id)
      .then(async () => console.log("Images deleted successfully"))
      .catch(() => console.error(err))
      .finally(() => disconnect(connection));
  }
  // ####################################

  try {
    await cloudinary.uploader.destroy(public_id, {
      folder: env.CLOUDINARY_FOLDER_IMAGES,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ data: null, success: false, message: "Internal server error", error: err });
  }

  return res.status(200).json({ data: null, success: true, message: "Images deleted successfully", error: null });
};

module.exports = deleteImage;
