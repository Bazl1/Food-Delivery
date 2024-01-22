import { gql } from "@apollo/client";

export const USER_EMAIL = gql`
    query accountInfo {
        accountInfo {
            email
        }
    }
`;
