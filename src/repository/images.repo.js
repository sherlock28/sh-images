exports.saveImagesURL = async (connection, imagesURL, idHouse) => {
  const promisesStore = imagesURL.map((image) => {
    const query = `INSERT INTO ownerships_images (imageurl, public_id, inmueble_id) VALUES ('${image.imageURL}','${image.publib_id}','${idHouse}')`;
    return connection.query(query);
  });
  return await Promise.all(promisesStore);
};

exports.deleteImages = async (connection, public_id) => {
  const query = `DELETE FROM ownerships_images WHERE public_id='${public_id}'`;
  return await await connection.query(query);
};
