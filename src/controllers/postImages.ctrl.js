const { cloudinary } = require("../config");
const fs = require("fs-extra");
const { connect, disconnect } = require("../database/dbconnection");
const imagestRepository = require("../repository/images.repo");

const postImages = async (req, res) => {
  const connection = await connect();
  const { idHouse } = req.body;
  if (!idHouse) {
    disconnect(connection);
    res.status(400).json({ status: "Error", message: "idHouse required" });
  }

  try {
    const images = req.files.map((file) => file.path);
    console.log("uploading images...");
    const promisesSave = images.map((image) => {
      return cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: process.env.CLOUDINARY_FOLDER_IMAGES,
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
    imagestRepository
      .saveImagesURL(connection, imagesSaved, idHouse)
      .then(() => {
        console.log("images saved");
        res.status(201).json({
          status: "OK",
          message: "Images saved successfully",
          data: {
            images: "imagesSaved",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(503)
          .json({ status: "Error", message: "Error saving images" });
      })
      .finally(() => disconnect(connection));
      
  } catch (err) {
    console.log(err);
    disconnect(connection);
    if (err.name === "TimeoutError") {
      res.status(499).json({ status: "Error", message: "Request Timeout" });
    } else {
      res
        .status(500)
        .json({ status: "Error", message: "Internal server error" });
    }
  }
};

module.exports = postImages;
