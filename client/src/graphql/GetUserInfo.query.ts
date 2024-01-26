import { gql } from "../__generated__/gql";

export const GET_ROLE = gql(`
    query accountInfo {
        accountInfo {
            role
        }
    }
`);
