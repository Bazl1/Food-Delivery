import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:5234/graphql",
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
