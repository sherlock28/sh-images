const { env } = require("../config/env");
const { request } = require("graphql-request");

function makeGqlRequest({ mutation, variables, headers }) {
    return request({
        url: env.GRAPHQL_ENDPOINT,
        document: mutation,
        variables: variables,
        requestHeaders: headers,
    }).then((data) => data);
}

module.exports = { makeGqlRequest };