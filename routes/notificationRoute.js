import express from 'express';
import getNotifications from '../controllers/notification/getNotifications.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getNotifications);

export default router;
