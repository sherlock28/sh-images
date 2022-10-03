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

module.exports = { AddImageMutation }; 