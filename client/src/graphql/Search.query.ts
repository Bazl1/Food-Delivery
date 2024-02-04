import { gql } from "../__generated__/gql";

export const SEARCH = gql(`
    query searchOnRestaurant($page: Int!, $limit: Int!, $predicate: String, $restaurantId: String, $filtering: String, $category: String){
        search(page: $page, limit: $limit, predicate: $predicate, restaurantId: $restaurantId, filtering: $filtering, category: $category){
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
