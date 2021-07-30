const { cloudinary } = require("../config");
const { connect, disconnect } = require("../database/dbconnection");

const deleteImage = async (req, res) => {
  const connection = await connect();

  try {
    const { public_id } = req.body;

    const query = `DELETE FROM ownerships_images WHERE public_id='${public_id}'`;
    await connection.query(query);

    await cloudinary.uploader.destroy(public_id, {
      folder: process.env.CLOUDINARY_FOLDER_IMAGES,
    });

    disconnect(connection);

    res.json({ status: "Ok", message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    disconnect(connection);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = deleteImage;
