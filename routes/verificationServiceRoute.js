import express from 'express';
import addVerificationService from '../controllers/verification/addVerificationService.js';
import editDataRequest from '../controllers/verification/editDataRequest.js';
import getDataRequest from '../controllers/verification/getDataRequest.js';
import getDataRequests from '../controllers/verification/getDataRequests.js';
import getVerificationService from '../controllers/verification/getVerificationService.js';
import getVerificationServices from '../controllers/verification/getVerificationServices.js';
import requestData from '../controllers/verification/requestData.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addVerificationService);
router.get('/', protect, getVerificationServices);
router.get('/:id', getVerificationService);
router.post('/request', protect, requestData);
router.get('/request/:id', getDataRequest);
router.put('/request', protect, editDataRequest);

export default router;
