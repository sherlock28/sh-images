const { env } = require("../config/env");
const { cloudinary } = require("../config");
const fs = require("fs-extra");
const { errors } = require("../middlewares");
const { makeGqlRequest } = require("../client/makeGqlRequest");
const { getAvatarMutationVars } = require("../client/getAvatarMutationVars");
const { AddAvatarImageMutation } = require("../client/mutation");
const { CheckUserByIdQuery } = require("../client/queries");
const { headers } = require("../client/headers");

const postImages = async (req, res) => {

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ data: null, success: false, message: "userId is required", error: "userId is missing" });
  }

  const data = await makeGqlRequest({ query: CheckUserByIdQuery, variables: { id: +userId }, headers });

  if (data.sh_users.length === 0) {
    return res.status(404).json({ data: null, success: false, message: "user id not found", error: "The user id does not exist" });
  }

  try {
    const avatar = req.files.map((file) => file.path);

    console.log("uploading avatar image...");

    const promisesSave = avatar.map((image) => {
      return cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: env.CLOUDINARY_FOLDER_AVATARS,
        overwrite: true,
      });
    });

    const response = await Promise.all(promisesSave);
    console.log("avatar image uploaded");

    const promisesRemove = avatar.map((image) => fs.unlink(image));
    await Promise.all(promisesRemove);

    const avatarSaved = response.map((res) => {
      return { imageURL: res.secure_url, publib_id: res.public_id };
    });

    console.log("saving to database...");
    avatarSaved.forEach((image) => {
      makeGqlRequest({ mutation: AddAvatarImageMutation, variables: getAvatarMutationVars({ userId: userId, image: image }), headers });
    });

    console.log("avatar image saved successfully");
    return res.status(201).json({
      data: avatarSaved,
      success: true,
      message: "Avatar image saved successfully",
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
