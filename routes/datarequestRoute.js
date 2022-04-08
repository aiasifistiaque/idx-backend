import express from 'express';

import getDataRequests from '../controllers/verification/getDataRequests.js';
import getDataRequestsOfAService from '../controllers/verification/getDataRequestsOfAService.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDataRequests);
router.get('/:id', protect, getDataRequestsOfAService);

export default router;
