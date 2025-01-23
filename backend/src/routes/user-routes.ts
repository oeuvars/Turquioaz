import express from 'express';
import { register } from '../api/user/auth/register';
import { login } from '../api/user/auth/login';
import { verifyRegistration } from '../api/user/auth/verify-registration';
import { forgotPassword } from '../api/user/auth/forgot-password';
import { verifyUpdation } from '../api/user/auth/verify-updation';
import { resetPassword } from '../api/user/auth/reset-password';
import { inventory } from '../api/user/collections/all-cars';
import { singleCar } from '../api/user/collections/single-car';
import { rentCar } from '../api/user/rent/rent-car';
import { rentStatus } from '../api/user/rent/rent-status';
import { rentedCars } from '../api/user/rent/rented-cars';
import { AddToWishlist } from '../api/user/wishlist/add-to-wishlist';
import { getWishlistedCars } from '../api/user/wishlist/get-wishlisted-cars';
import { deleteFromWishlist } from '../api/user/wishlist/delete-from-wishlist';
import { totalCars } from '../api/user/collections/total-cars';
import { featuredCars } from '../api/user/collections/featured-cars';
import { authentication } from '../middleware/user-authenticator';
import { getWishlist } from '../api/user/wishlist/get-wishtlist';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-registration', verifyRegistration);
router.post('/forgot-password', forgotPassword);
router.post('/verify-updation', verifyUpdation);
router.post('/reset-password', resetPassword);

router.get('/inventory', inventory);
router.get('/featured-cars', featuredCars);
router.get('/total-cars', totalCars);
router.get('/car/:id', singleCar);

router.post('/rent-car/:id', authentication, rentCar);
router.put('/rent-status/:id', authentication, rentStatus);
router.get('/rented-cars', authentication, rentedCars);

router.post('/add-to-wishlist/:id', authentication, AddToWishlist);
router.get('/get-wishlisted-cars', authentication, getWishlistedCars);
router.get('/get-wishlist', authentication, getWishlist);
router.delete('/delete-from-wishlist/:id', authentication, deleteFromWishlist);

export default router;
