import { gql } from "../__generated__/gql";

export const SIGN_UP_AS_CUSTOMER = gql(`
    mutation signUpAsCustomer($email: String!, $password: String!, $userName: String!) {
        signUpAsCustomer(email: $email, password: $password, userName: $userName) {
            accessToken
        }
    }
`);
