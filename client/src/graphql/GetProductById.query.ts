import { gql } from "../__generated__/gql";

export const GET_PRODUCT_BY_ID = gql(`
    query productById($id: String!){
        productById(id: $id){
            id
            picture
            title
            description
            price
        }
    }
`);
