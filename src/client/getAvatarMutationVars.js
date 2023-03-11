function getAvatarMutationVars({ image, userId }) {
    return {
        imageurl: image.imageURL,
        user_id: userId
    }
}

module.exports = { getAvatarMutationVars };