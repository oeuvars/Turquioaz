import { Component, createEffect, createSignal, lazy, JSX } from "solid-js";
import { Routes, Route, Navigate, Router } from "@solidjs/router";
import Home from "../pages/Home";
import Collections from "../pages/Collections";
import Search from "../pages/Search";
import Info from "../pages/Info";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Collection from "../pages/Collection";
import User from "../pages/User";
import Wishlist from "../pages/Wishlist";

const hideNavbarpages = ["/success", "/login"]

const AppRoutes: Component = () => {
  const hideNavbar = hideNavbarpages.includes(window.location.pathname);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:slug" element={<Collection/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/info" element={<Info />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<User />} />
        <Route path="/wishlist" element={<Wishlist />}/>
      </Routes>
  );
};

export default AppRoutes;
