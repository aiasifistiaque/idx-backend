import express from 'express';
import getMyDetails from '../controllers/user/getMyDetails.js';
import listMyCustomers from '../controllers/user/listMyCustomers.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/customer', protect, listMyCustomers);
router.get('/self', protect, getMyDetails);

export default router;
