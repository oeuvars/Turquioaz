import express from 'express';
import { authentication } from '../middleware/admin-authenticator';
import { login } from '../api/admin/auth/login';
import { inventory } from '../api/admin/collections/inventory';
import { singleCar } from '../api/admin/collections/single-car';
import { addCar } from '../api/admin/collections/add-car';
import { updateCar } from '../api/admin/collections/update-car';
import { deleteCar } from '../api/admin/collections/delete-car';

const router = express.Router();

router.post('/login', login);

router.get('/inventory', authentication, inventory);
router.get('/inventory/:id', authentication, singleCar);

router.post('/add-car', authentication, addCar);
router.put('/update-car/:id', authentication, updateCar);
router.delete('/delete-car/:id', authentication, deleteCar);

export default router;
