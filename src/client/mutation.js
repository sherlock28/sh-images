const { gql } = require("graphql-request");

const AddImageMutation = gql`
    mutation AddImage($imageurl: String!, $ownerships_id: bigint!, $public_id: String!) {
        insert_sh_ownerships_images_one(object: { imageurl: $imageurl, ownerships_id: $ownerships_id, public_id: $public_id }) {
            imageurl
            ownerships_id
            public_id
        }
    }    
`;

const DeleteImageMutation = gql`
    mutation DeleteImage($public_id: String!) {
        delete_sh_ownerships_images(where: {public_id: {_eq: $public_id}}) {
            affected_rows
        }
    }
`;

module.exports = { AddImageMutation, DeleteImageMutation }; 