const { cloudinary } = require("../config");
const fs = require("fs-extra");
const connection = require("../database/dbconnection");

const postImages = async (req, res) => {
  try {
    const images = req.files.map(file => file.path);
    const promisesSave = images.map(image => {
      return cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: "segundohogar/images",
        overwrite: true,
      });
    });
    const response = await Promise.all(promisesSave);

    const imagesSaved = response.map(res => {
      return { imageURL: res.secure_url, publib_id: res.public_id };
    });

    const promisesStore = imagesSaved.map(image => {
      const query = `INSERT INTO images (imageURL, public_id, ownerships_id) VALUES ('${
        image.imageURL
      }','${image.publib_id}',${1})`;
      return connection.query(query);
    });
    await Promise.all(promisesStore);

    const promisesRemove = images.map(image => fs.unlink(image));
    await Promise.all(promisesRemove);

    res.status(201).json({
      status: "Ok",
      message: "Images saved successfully",
      data: {
        images: "imagesSaved",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = postImages;
