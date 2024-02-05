import { gql } from "../__generated__/gql";

export const CREATE_ORDER = gql(`
    mutation createOrder($items: [OrderItemInput!]!){
        createOrder(items: $items){
            customer{
                userName,
                email
            }
            items{
                picture
                title
                price
                count
            }
            totalPrice
        }
    }
`);
