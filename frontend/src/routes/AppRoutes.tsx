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
import Model from "../pages/Model";
import User from "../pages/User";
import Wishlist from "../pages/Wishlist";
import Success from "../pages/Success";
import { render } from "solid-js/web";

const hideNavbarpages = ["/success", "/login"];

const AppRoutes: Component = () => {
  const hideNavbar = hideNavbarpages.includes(window.location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/collections" component={Collections} />
        <Route path="/model/:slug" component={Model} />
        <Route path="/search" component={Search} />
        <Route path="/info" component={Info} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/contact" component={Contact} />
        <Route path="/user" component={User} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/success" component={Success} />
      </Routes>
    </>
  );
};

export default AppRoutes;
