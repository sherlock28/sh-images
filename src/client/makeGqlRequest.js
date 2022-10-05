const { env } = require("../config/env");
const { request } = require("graphql-request");

function makeGqlRequest({ query, mutation, variables, headers }) {

    if (mutation) {
        return request({
            url: env.GRAPHQL_ENDPOINT,
            document: mutation,
            variables: variables,
            requestHeaders: headers,
        }).then((data) => data);
    }

    return request({
        url: env.GRAPHQL_ENDPOINT,
        document: query,
        variables: variables,
        requestHeaders: headers,
    }).then((data) => data);

}

module.exports = { makeGqlRequest };