import { gql } from "../__generated__/gql";

export const SIGN_UP_AS_RESTAURANT = gql(`
    mutation signUpAsRestaurant($email: String!, $password: String!, $name: String!, $description: String!) {
        signUpAsRestaurant(email: $email, password: $password, name: $name, description: $description) {
            accessToken
        }
    }
`);
