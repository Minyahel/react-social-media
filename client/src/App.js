import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { Container } from "semantic-ui-react";
import { Routes } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <AuthRoute exact path="/login" element={<Login />} />
            <AuthRoute exact path="/register" element={<Register />} />
            <Route exact path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
