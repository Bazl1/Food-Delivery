import { gql } from "../__generated__/gql";

export const DELETE_PRODUCT = gql(`
    mutation deleteProduct($id: String!){
        deleteProduct(id: $id)
    }
`);
