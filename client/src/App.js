import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import NavLink from "./components/NavLink";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import GroupPage from "./components/GroupPage";
// import DataPage from "./components/DataPage";
import ManageGroupsPage from "./components/ManageGroupsPage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavLink />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/my-tasks" element={<MyPage />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/manage-groups" element={<ManageGroupsPage />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
