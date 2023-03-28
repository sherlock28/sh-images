const { env } = require("../config/env");
const { cloudinary } = require("../config");
const { makeGqlRequest } = require("../client/makeGqlRequest");
const { getVariables } = require("../client/getVariables");
const { DeleteImageMutation } = require("../client/mutation");
const { headers } = require("../client/headers");

const deleteImage = async (req, res) => {
  const { public_id } = req.body;

  try {
    if (!public_id) {
      return res.status(400).json({ status: "Error", message: "public_id required" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ data: null, success: false, message: "Internal server error", error: err });
  }

  console.log("removing from database...");
  let image = {}; image['publib_id'] = public_id;
  makeGqlRequest({ query: DeleteImageMutation, variables: getVariables({ image , method: "DELETE" }), headers });

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
