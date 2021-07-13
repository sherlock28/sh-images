const { cloudinary } = require("../config");
const fs = require("fs-extra");
const { connect, disconnect } = require("../database/dbconnection");

const postImages = async (req, res) => {
  const connection = await connect();

  try {
    const images = req.files.map(file => file.path);
    console.log("uploading images...");
    const promisesSave = images.map(image => {
      return cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: "segundohogar/images",
        overwrite: true,
      });
    });
    const response = await Promise.all(promisesSave);
    console.log("images uploaded");

    const imagesSaved = response.map(res => {
      return { imageURL: res.secure_url, publib_id: res.public_id };
    });

    console.log("saving to database...");
    const promisesStore = imagesSaved.map(image => {
      const query = `INSERT INTO ownerships_images (imageurl, public_id, inmueble_id) VALUES ('${
        image.imageURL
      }','${image.publib_id}',${5})`;
      return connection.query(query);
    });
    await Promise.all(promisesStore);

    const promisesRemove = images.map(image => fs.unlink(image));
    await Promise.all(promisesRemove);

    disconnect(connection);

    res.status(201).json({
      status: "Ok",
      message: "Images saved successfully",
      data: {
        images: "imagesSaved",
      },
    });
  } catch (err) {
    console.log(err);
    disconnect(connection);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = postImages;
