const { env } = require("../config/env");
const { cloudinary } = require("../config");
const fs = require("fs-extra");
const { connect, disconnect } = require("../database/dbconnection");
const imagesRepository = require("../repository/images.repo");
const { errors } = require("../middlewares");
const { makeGqlRequest } = require("../client/makeGqlRequest"); 
const { getVariables } = require("../client/getVariables"); 
const { AddImageMutation } = require("../client/mutation"); 
const { headers } = require("../client/headers"); 

const postImages = async (req, res) => {
  const connection = null;
  if (env.ENABLE_SAVE_MYSQL) connection = await connect();

  const { idHouse } = req.body;

  if (!idHouse) {
    if (env.ENABLE_SAVE_MYSQL) disconnect(connection);
    return res.status(400).json({ data: null, success: false, message: "idHouse is required", error: "idHouse is missing" });
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

    // #### deprecated ####
    if (env.ENABLE_SAVE_MYSQL) {
      console.log("saving to mysql database...");
      imagesRepository
        .saveImagesURL(connection, imagesSaved, idHouse)
        .then(() => console.log("images saved successfully"))
        .catch((err) => console.error(err))
        .finally(() => disconnect(connection));
    }
    // ####################################

    console.log("saving to database...");
    imagesSaved.forEach((image) => {
      makeGqlRequest({ mutation: AddImageMutation, variables: getVariables({ idHouse: idHouse, image: image, method: "INSERT" }), headers });
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
    if (env.ENABLE_SAVE_MYSQL) disconnect(connection);
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
