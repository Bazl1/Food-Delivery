import { gql } from "../__generated__/gql";

export const RESTAURANT_INFO = gql(`
    query restaurantInfo {
        restaurantInfo {
            id
            bannerUrl
            name
        }
    }
`);

export const RESTAURANT_PRODUCTS = gql(`
    query search($page: Int!, $limit: Int!, $restaurantId: String){
        search(page: $page, limit: $limit, restaurantId: $restaurantId){
            id
            picture
            title
            price
            categories{
                id
                title
            }
            description
        }
    }
`);
