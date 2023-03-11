const { env } = require("../config/env");
const fetch = require("node-fetch");

function makeGqlRequest({ query, mutation, variables, headers }) {

    if (mutation) {
        return fetch(env.GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                query: mutation,
                variables: variables,
            })
        }).then((response) => response.json())
            .then((res) => res);
    }

    return fetch(env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables,
        })
    }).then((response) => response.json())
        .then((res) => res);

}

module.exports = { makeGqlRequest };