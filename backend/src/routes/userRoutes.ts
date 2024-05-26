import express from 'express';
import { register } from '../controllers/user/auth/register';
import { login } from '../controllers/user/auth/login';
import { verifyRegistration } from '../controllers/user/auth/verify-registration';
import { forgotPassword } from '../controllers/user/auth/forgot-password';
import { verifyUpdation } from '../controllers/user/auth/verify-updation';
import { resetPassword } from '../controllers/user/auth/reset-password';
import { inventory } from '../controllers/user/collections/all-cars';
import { singleCar } from '../controllers/user/collections/single-car';
import { rentCar } from '../controllers/user/rent/rent-car';
import { rentStatus } from '../controllers/user/rent/rent-status';
import { rentedCars } from '../controllers/user/rent/rented-cars';
import { AddToWishlist } from '../controllers/user/wishlist/add-to-wishlist';
import { getWishlistedCars } from '../controllers/user/wishlist/get-wishlisted-cars';
import { deleteFromWishlist } from '../controllers/user/wishlist/delete-from-wishlist';
import { totalCars } from '../controllers/user/collections/total-cars';
import { featuredCars } from '../controllers/user/collections/featured-cars';
import { authentication } from '../middleware/userAuthenticator';
import { getWishlist } from '../controllers/user/wishlist/get-wishtlist';

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
