const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_FOLDER_IMAGES: process.env.CLOUDINARY_FOLDER_IMAGES,
    ENABLE_SAVE_MYSQL: process.env.ENABLE_SAVE_MYSQL,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    X_HASURA_ADMIN_SECRET: process.env.X_HASURA_ADMIN_SECRET
}

module.exports = { env }
