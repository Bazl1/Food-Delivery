import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const response = await AuthService.refresh();
            const newToken = response.data.result.accessToken;
            localStorage.setItem("token", newToken);
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${newToken}`,
                },
            };
        } catch (error) {
            console.log("Не удалось обновить токен");
        }
    }

    return {
        headers: {
            ...headers,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
