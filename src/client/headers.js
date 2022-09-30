const { env } = require("../config/env");

const headers = {
    "x-hasura-admin-secret": env.X_HASURA_ADMIN_SECRET
}

module.exports = { headers };