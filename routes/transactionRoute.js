import express from 'express';
import getReceipt from '../controllers/credential/getReceipt.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getReceipt);

export default router;
