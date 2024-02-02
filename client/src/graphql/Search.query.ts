import { gql } from "../__generated__/gql";

export const SEARCH = gql(`
    query searchOnRestaurant($page: Int!, $limit: Int!, $predicate: String, $restaurantId: String){
        search(page: $page, limit: $limit, predicate: $predicate, restaurantId: $restaurantId){
            products{
                id
                picture
                title
                price
            }
            pageCount
        }
    }
`);
