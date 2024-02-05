import { gql } from "../__generated__/gql";

export const GET_ALL_RESTAURANT = gql(`
    query getRestaurants{
        restaurants{
            id
            name
            bannerUrl
            description
        }
    }
`);
