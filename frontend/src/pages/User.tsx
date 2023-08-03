import { A, Route, Routes, Router } from "@solidjs/router";
import { Component } from "solid-js";
import Login from "./Login";
import Signup from "./Signup";

const User: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </Router>
  );
};

export default User;
