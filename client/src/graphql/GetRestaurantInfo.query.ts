import { gql } from "../__generated__/gql";

export const GET_RESTAURANT_BANNER = gql(`
    query restaurantBanner {
        restaurantInfo {
            bannerUrl
        }
    }
`);
