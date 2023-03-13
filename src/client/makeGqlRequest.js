const { env } = require("../config/env");
const fetch = require("node-fetch");

async function makeGqlRequest({ query, variables, headers }) {

    const response = await fetch(
        env.GRAPHQL_ENDPOINT,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ query: query, variables: variables })
        });
    
        const result = await response.json();

        return result;
}

module.exports = { makeGqlRequest };