import { gql } from "@apollo/client";

export const REGISTRATION = gql`
    mutation SignUpAsCustomer($user: String!, $email: String!, $role: String!, $location: String!) {
        SignUpAsCustomer($user: String!, $email: String!, $role: String!, $location: String!) {
            assestToken
        }
    }

    mutation SignUpAsRestaurant($user: String!, $email: String!, $role: String!, $location: String!) {
        SignUpAsRestaurant($user: String!, $email: String!, $role: String!, $location: String!) {
            assestToken
        }
    }
`;
