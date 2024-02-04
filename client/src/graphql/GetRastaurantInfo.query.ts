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
    query GetProducts($page: Int!, $limit: Int!, $restaurantId: String){
        search(page: $page, limit: $limit, restaurantId: $restaurantId){
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

export const GET_RESTAURANT_BY_ID = gql(`
    query getRestaurantById($id: String!){
        restaurantById(id: $id){
            id
            bannerUrl
            name
        }
    }
`);
