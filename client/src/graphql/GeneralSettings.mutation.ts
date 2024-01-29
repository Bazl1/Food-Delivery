import { gql } from "../__generated__/gql";

export const CHANGE_GENERAL_SETTINGS = gql(`
    mutation updateRestaurant($name: String!, $description: String!, $bannerUrl: String!) {
        updateRestaurant(name: $name, description: $description, bannerUrl: $bannerUrl) {
            id
        }
    }
`);
