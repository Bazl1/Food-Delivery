import { gql } from "../__generated__/gql";

export const CHANGE_PASSWORD = gql(`
    mutation passwordChange($oldPassword: String!, $password: String!){
        passwordChange(oldPassword: $oldPassword, password: $password){
            id
        }
    }
`);
