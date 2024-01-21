import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";
import { REFRESH_TOKEN } from "./Refresh";

const httpLink = createHttpLink({
    uri: "http://localhost:5234/graphql",
});

const handleRefreshToken = async () => {
    const { data, error } = useQuery(REFRESH_TOKEN);
    if (error) {
        throw new Error("Error refresh token");
    }
    console.log(data);
    localStorage.setItem("token", data.refreshToken.accessToken);
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

handleRefreshToken();
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
