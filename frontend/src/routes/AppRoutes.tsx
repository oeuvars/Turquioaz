import { Component, lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import User from "../pages/User";
import Success from "../pages/Success";

const Info = lazy(() => import("../pages/Info"));
const Contact = lazy(() => import("../pages/Contact"));
const Collections = lazy(() => import("../pages/Collections"));
const Search = lazy(() => import("../pages/Search"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Model = lazy(() => import("../pages/Model"));

const AppRoutes: Component = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/model/:slug" element={<Model />} />
        <Route path="/search" element={<Search />} />
        <Route path="/info" element={<Info />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/success" element={<Success />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
