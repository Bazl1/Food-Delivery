/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation signIn($email: String!, $password: String!) {\n        signIn(email: $email, password: $password) {\n            accessToken\n        }\n    }\n": types.SignInDocument,
    "\n    query restaurantInfo {\n        restaurantInfo {\n            bannerUrl\n        }\n    }\n": types.RestaurantInfoDocument,
    "\n    query accountInfo {\n        accountInfo {\n            role\n        }\n    }\n": types.AccountInfoDocument,
    "\n    mutation  signOut{\n        signOut\n    }\n": types.SignOutDocument,
    "\n    mutation refreshToken {\n        refreshToken {\n            accessToken\n        }\n    }\n": types.RefreshTokenDocument,
    "\n    mutation signUpAsCustomer($email: String!, $password: String!, $userName: String!) {\n        signUpAsCustomer(email: $email, password: $password, userName: $userName) {\n            accessToken\n        }\n    }\n": types.SignUpAsCustomerDocument,
    "\n    mutation signUpAsRestaurant($email: String!, $password: String!, $name: String!, $description: String!) {\n        signUpAsRestaurant(email: $email, password: $password, name: $name, description: $description) {\n            accessToken\n        }\n    }\n": types.SignUpAsRestaurantDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation signIn($email: String!, $password: String!) {\n        signIn(email: $email, password: $password) {\n            accessToken\n        }\n    }\n"): (typeof documents)["\n    mutation signIn($email: String!, $password: String!) {\n        signIn(email: $email, password: $password) {\n            accessToken\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query restaurantInfo {\n        restaurantInfo {\n            bannerUrl\n        }\n    }\n"): (typeof documents)["\n    query restaurantInfo {\n        restaurantInfo {\n            bannerUrl\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query accountInfo {\n        accountInfo {\n            role\n        }\n    }\n"): (typeof documents)["\n    query accountInfo {\n        accountInfo {\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation  signOut{\n        signOut\n    }\n"): (typeof documents)["\n    mutation  signOut{\n        signOut\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation refreshToken {\n        refreshToken {\n            accessToken\n        }\n    }\n"): (typeof documents)["\n    mutation refreshToken {\n        refreshToken {\n            accessToken\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation signUpAsCustomer($email: String!, $password: String!, $userName: String!) {\n        signUpAsCustomer(email: $email, password: $password, userName: $userName) {\n            accessToken\n        }\n    }\n"): (typeof documents)["\n    mutation signUpAsCustomer($email: String!, $password: String!, $userName: String!) {\n        signUpAsCustomer(email: $email, password: $password, userName: $userName) {\n            accessToken\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation signUpAsRestaurant($email: String!, $password: String!, $name: String!, $description: String!) {\n        signUpAsRestaurant(email: $email, password: $password, name: $name, description: $description) {\n            accessToken\n        }\n    }\n"): (typeof documents)["\n    mutation signUpAsRestaurant($email: String!, $password: String!, $name: String!, $description: String!) {\n        signUpAsRestaurant(email: $email, password: $password, name: $name, description: $description) {\n            accessToken\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;