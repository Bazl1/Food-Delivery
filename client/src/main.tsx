import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/global.scss";
import { ApolloProvider } from "@apollo/client";
import client from "./assets/utils/apollo/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);
