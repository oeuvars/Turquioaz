import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Cart from "../pages/user/payment-gateway/Cart";
import Login from "../pages/user/auth/Login";
import AdminLogin from "../pages/admin/auth/AdminLogin";
import Signup from "../pages/user/auth/Signup";
import Success from "../pages/user/payment-gateway/Success";
import Model from "../pages/user/cars/Model";
import Search from "../pages/user/cars/Search";
import Wishlist from "../pages/user/cars/Wishlist";
import Collections from "../pages/user/cars/Collections";
import Contact from "../pages/user/contact/Contact";
import Info from "../pages/user/contact/Info";
import Home from "../pages/home/Home";
import Rentedcars from "../pages/user/cars/RentedCars";
import AdminSignup from "../pages/admin/auth/AdminSignup";
import Inventory from "../pages/admin/cars/Inventory";
import AdminModel from "../pages/admin/cars/AdminModel";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import ResetPassword from "../pages/user/auth/ResetPassword";
import PleaseVerify from "../pages/user/auth/PleaseVerify";
import AddCars from "../pages/admin/cars/AddCars";
import UpdateCars from "../pages/admin/cars/UpdateCars";
import PasswordUpdated from "../pages/user/auth/PasswordUpdated";

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
        <Route path="/user/rented-cars" element={<Rentedcars />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/user/please-verify" element={<PleaseVerify />} />
        <Route path="/user/password-updated" element={<PasswordUpdated />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/inventory/:id" element={<AdminModel />} />
        <Route path="/admin/inventory/add-cars" element={<AddCars />} />
        <Route path="/admin/inventory/update-cars/:id" element={<UpdateCars />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
