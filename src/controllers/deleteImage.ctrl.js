const { cloudinary } = require("../config/cloudinary");
// const { Product } = require("../../models");

const deleteImage = async (req, res) => {
  try {
    const { id_image } = req.params;

    // const product = await Product.findByIdAndRemove(id_product);

    // const result = await cloudinary.uploader.destroy(product.public_id);

    res.json({ status: "Ok", message: "Product successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = deleteImage;
