const { env } = require("../config/env");
const { cloudinary } = require("../config");
const fs = require("fs-extra");
const { errors } = require("../middlewares");
const { makeGqlRequest } = require("../client/makeGqlRequest"); 
const { getVariables } = require("../client/getVariables"); 
const { AddImageMutation } = require("../client/mutation"); 
const { CheckOwnershipByIdQuery } = require("../client/queries"); 
const { headers } = require("../client/headers"); 

const postImages = async (req, res) => {

  const { idHouse } = req.body;

  if (!idHouse) {
    return res.status(400).json({ data: null, success: false, message: "idHouse is required", error: "idHouse is missing" });
  }

  const response = await makeGqlRequest({ query: CheckOwnershipByIdQuery, variables: { id: +idHouse }, headers });
  
  if (response?.data?.sh_ownerships.length === 0) {
    return res.status(404).json({ data: null, success: false, message: "ownership id not found", error: "The ownership id does not exist" });
  }

  try {
    const images = req.files.map((file) => file.path);
    console.log("uploading images...");
    const promisesSave = images.map((image) => {
      return cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: env.CLOUDINARY_FOLDER_IMAGES,
        overwrite: true,
      });
    });
    const response = await Promise.all(promisesSave);
    console.log("images uploaded");

    const promisesRemove = images.map((image) => fs.unlink(image));
    await Promise.all(promisesRemove);

    const imagesSaved = response.map((res) => {
      return { imageURL: res.secure_url, publib_id: res.public_id };
    });

    console.log("saving to database...");
    imagesSaved.forEach((image) => {
      makeGqlRequest({ query: AddImageMutation, variables: getVariables({ idHouse: idHouse, image: image, method: "INSERT" }), headers });
    });

    console.log("images saved successfully");
    return res.status(201).json({
      data: imagesSaved,
      success: true,
      message: "Images saved successfully",
      error: null
    });

  } catch (err) {
    console.log(err);
    if (err.name === "TimeoutError") {
      return res.status(499).json({ data: null, success: false, message: "Request Timeout", error: errors.name });
    } else {
      return res
        .status(500)
        .json({ data: null, success: false, message: "Internal server error", error: errors.name });
    }
  }
};

module.exports = postImages;
