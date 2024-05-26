import About from '@/app/extra/AboutUs'
import ContactUs from '@/app/extra/ContactUs'
import Home from '@/app/home/Home'
import Login from '@/app/auth/Login'
import Register from '@/app/auth/Register'
import VerifyRegistation from '@/app/auth/VerifyRegistration'
import AllCars from '@/app/showcase/cars/inventory/AllCars'
import RentACar from '@/app/showcase/cars/inventory/RentACar'
import SingleCarCard from '@/app/showcase/cars/inventory/SingleCarCard'
import Success from '@/app/showcase/checkout/Success'
import Wishlist from '@/app/showcase/wishlist/Wishlist'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from '@/app/extra/404'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path='/auth/verify-registration' element={<VerifyRegistation />} />
      <Route path="/the-collection/all-cars" element={<AllCars />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path="/the-collection/all-cars/:id" element={<SingleCarCard />} />
      <Route path="/the-collection/all-cars/rent-car/:id" element={<RentACar />} />
      <Route path="/order-confirmation" element={<Success />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRoutes
