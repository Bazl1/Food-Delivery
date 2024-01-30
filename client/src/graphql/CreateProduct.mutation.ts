import { gql } from "../__generated__/gql";

export const CREATE_PRODUCT = gql(`
    mutation createProduct(
        $title: String!
        $description: String!
        $picture: String!
        $price: String!
        $categories: [String!]!
    ) {
        createProduct(
            title: $title
            description: $description
            picture: $picture
            price: $price
            categories: $categories
        ) {
            id
        }
    }
`);
