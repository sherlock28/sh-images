const { gql } = require("graphql-request");

const CheckOwnershipByIdQuery = gql`
    query CheckOwnershipById($id: Int) {
        sh_ownerships(where: {id: {_eq: $id}}) {
            id
        }
    }
`;

const CheckUserByIdQuery = gql`
    query CheckUserByIdQuery($id: Int) {
        sh_users(where: {id: {_eq: $id}}) {
            id
        }
    }
`;

module.exports = { CheckOwnershipByIdQuery, CheckUserByIdQuery }; 
