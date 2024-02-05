import { gql } from "../__generated__/gql";

export const GET_CART_PRODUCTS = gql(`
    query productsByIds($ids: [String!]!){
        productsByIds(ids: $ids){
                id
                title
                price
                picture
        }
    }
`);
