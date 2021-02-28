import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Routes from "./Routes";
import Boards from "./components/pages/Boards/";
import Board from "./components/pages/Board";

const client = new ApolloClient({
  uri: `http://localhost:3009/graphql`,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const routes = [
  {
    path: "/:boardId",
    component: Board,
    exact: false,
  },
  {
    path: "/",
    component: Boards,
    exact: true,
  },
];

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes routes={routes} />
      </ApolloProvider>
    );
  }
}

export default App;
