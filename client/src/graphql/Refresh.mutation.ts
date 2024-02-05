import { gql } from "../__generated__/gql";

export const REFRESH_TOKEN = gql(`
    mutation refreshToken {
        refreshToken {
            accessToken
        }
    }
`);
