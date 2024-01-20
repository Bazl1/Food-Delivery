import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
// import { createHttpLink } from "@apollo/client/link/http";
// import { setContext } from "@apollo/client/link/context";
// import { REFRESH_TOKEN } from "./Refresh";

// const httpLink = createHttpLink({
//     uri: "http://localhost:5252/graphql",
// });

// const [refreshToken] = useMutation(REFRESH_TOKEN);

// const authLink = setContext(async (_, { headers }) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await refreshToken();

//             const newToken = response.data.accessToken;
//             localStorage.setItem("token", newToken);
//             return {
//                 headers: {
//                     ...headers,
//                     authorization: `Bearer ${newToken}`,
//                 },
//             };
//         } catch (error) {
//             console.log("Failed to refresh token");
//         }
//     }

//     return {
//         headers: {
//             ...headers,
//         },
//     };
// });

const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    uri: "http://localhost:5252/graphql",
    cache: new InMemoryCache(),
});

export default client;
