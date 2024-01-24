import { gql } from "../__generated__/gql";

export const USER_EMAIL = gql(`
    query accountInfo {
        accountInfo {
            email
            role
        }
    }
`);
