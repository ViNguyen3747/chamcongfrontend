import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Users from "./components/User";
import Signin from "./components/Authentication";
import NotFoundPage from "./components/NotFoundPage";
import auth from "./utils/auth";

const link = new HttpLink({
  uri: "https://benh-vien-phu-vang.as.r.appspot.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router className="App">
        {auth.loggedIn() && <Navbar />}
        <Routes>
          <Route path="/" exact element={<Signin />} />
          {auth.loggedIn() && (
            <Route path="/bangchamcong" element={<Tasks />} />
          )}
          {auth.isAdmin() && <Route path="/taikhoan" element={<Users />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
export default App;
