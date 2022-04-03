import express from 'express';
import listMyCustomers from '../controllers/user/listMyCustomers.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/customer', protect, listMyCustomers);

export default router;
