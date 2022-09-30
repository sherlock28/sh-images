function getVariables({ idHouse, image }) {
    return {
        imageurl: image.imageURL,
        ownerships_id: idHouse,
        public_id: image.publib_id
    }
}

module.exports = { getVariables };