import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Cart from "../pages/user/payment-gateway/Cart";
import Login from "../pages/user/auth/Login";
import Signup from "../pages/user/auth/Signup";
import Success from "../pages/user/payment-gateway/Success";
import Model from "../pages/user/cars/Model";
import Search from "../pages/user/cars/Search";
import Wishlist from "../pages/user/cars/Wishlist";
import Collections from "../pages/user/cars/Collections";
import Contact from "../pages/user/contact/Contact";
import Info from "../pages/user/contact/Info";
import Home from "../pages/home/Home";

const UserRoutes: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info" element={<Info />} />

        {/* User Routes */}
        <Route path="/user/collections" element={<Collections />} />
        <Route path="/user/model/:id" element={<Model />} />
        <Route path="/user/search" element={<Search />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/wishlist" element={<Wishlist />} />
        <Route path="/user/success/:id" element={<Success />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
