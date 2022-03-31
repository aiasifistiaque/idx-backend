import express from 'express';
import addTemplate from '../controllers/template/addTemplate.js';
import getAllTemplates from '../controllers/template/getAllTemplates.js';
import getTemplate from '../controllers/template/getTemplate.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addTemplate);
router.get('/', protect, getAllTemplates);
router.get('/:id', getTemplate);

export default router;
