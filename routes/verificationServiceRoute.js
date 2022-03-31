import express from 'express';
import addVerificationService from '../controllers/verification/addVerificationService.js';
import getVerificationService from '../controllers/verification/getVerificationService.js';
import getVerificationServices from '../controllers/verification/getVerificationServices.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addVerificationService);
router.get('/', protect, getVerificationServices);
router.get('/:id', getVerificationService);

export default router;
