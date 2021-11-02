exports.saveImagesURL = async (imagesURL, idHouse) => {
  const promisesStore = imagesURL.map((image) => {
    const query = `INSERT INTO ownerships_images (imageurl, public_id, inmueble_id) VALUES ('${image.imageURL}','${image.publib_id}','${idHouse}')`;
    return connection.query(query);
  });
  return await Promise.all(promisesStore);
};
