import { gql } from "@apollo/client";

export const AUTH = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            accessToken
        }
    }
`;
