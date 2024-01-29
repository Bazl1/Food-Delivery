import { gql } from "../__generated__/gql";

export const CHANGE_PASSWORD = gql(`
    mutation passwordChange($password: String!){
        passwordChange(password: $password){}
    }
`);
