import express from 'express';
import readMyCredential from '../controllers/credential/readMyCredential.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, readMyCredential);

export default router;
