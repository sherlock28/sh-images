function getVariables({ idHouse, image, method }) {

    if (method === "DELETE") {
        return {
            public_id: image.publib_id
        }
    }

    return {
        imageurl: image.imageURL,
        ownerships_id: idHouse,
        public_id: image.publib_id
    }
}

module.exports = { getVariables };