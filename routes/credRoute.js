import express from 'express';
import { protect } from '../middleware/auth.js';
import addCredentials from '../controllers/credential/addCredentials.js';
import getUserCredentials from '../controllers/credential/getUserCredentials.js';
import getAllCredentials from '../controllers/credential/getAllCredentials.js';
import getCredential from '../controllers/credential/getCredential.js';
import updateCredentialStatus from '../controllers/credential/updateCredentialStatus.js';

const router = express.Router();

router.post('/', protect, addCredentials);
router.get('/', protect, getAllCredentials);
router.get('/user', protect, getUserCredentials);
router.get('/:id', getCredential);
router.put('/:id', updateCredentialStatus);

export default router;
