import { gql } from "../__generated__/gql";

export const AUTH = gql(`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            accessToken
        }
    }
`);
