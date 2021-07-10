const { cloudinary } = require("../config");
const connection = require("../database/dbconnection");

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    const query = `DELETE FROM ownerships_images WHERE public_id='${public_id}'`;
    await connection.query(query);

    await cloudinary.uploader.destroy(public_id);

    res.json({ status: "Ok", message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = deleteImage;
