import { gql } from "../__generated__/gql";

export const VERIFICATION = gql(`
    query verify{
        verify{
            isAuth
            role
        }
    }
`);
