import About from '@/app/contacts/AboutUs'
import ContactUs from '@/app/contacts/ContactUs'
import Home from '@/app/home/Home'
import TheCollection from '@/app/user/TheCollection'
import Login from '@/app/user/auth/Login'
import Register from '@/app/user/auth/Register'
import VerifyRegistation from '@/app/user/auth/VerifyRegistration'
import AllCars from '@/app/user/cars/inventory/AllCars'
import RentACar from '@/app/user/cars/inventory/RentACar'
import SingleCarCard from '@/app/user/cars/inventory/SingleCarCard'
import Success from '@/app/user/checkout/Success'
import Wishlist from '@/app/user/wishlist/Wishlist'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path='/auth/verify-registration' element={<VerifyRegistation />} />
      <Route path="/the-collection" element={<TheCollection />} />
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
