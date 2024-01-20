import { gql } from "@apollo/client";

export const SIGN_UP_AS_RESTAURANT = gql`
    mutation SignUpAsRestaurant($user: String!, $email: String!, $role: String!) {
        SignUpAsRestaurant(user: $user, email: $email, role: $role) {
            assestToken
        }
    }
`;
