import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Credential from '../models/credentialsModel.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const issueJwt = data => {
	const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
	return token;
};

const addCred = asyncHandler(async (req, res) => {
	try {
		let simplified = {};
		req.body.data?.map((item, i) => {
			simplified[item.name] = item.value;
		});
		const token = issueJwt(simplified);
		const newCred = new Credential({
			issuer: 'test@identrix.io',
			credentialType: req.body.template.name,
			status: 'pending',
			token: token,
			user: req.body.user,
		});
		const saved = await newCred.save();
		res.status(201).json({ body: simplified, token });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

const getCreds = asyncHandler(async (req, res) => {
	const status = req.query.status ? { status: req.query.status } : {};
	try {
		const credentials = await Credential.find(status)
			.select('-token')
			.sort('-createdAt');
		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

const getUserCreds = asyncHandler(async (req, res) => {
	const status = req.query.status
		? { status: req.query.status, user: req.user.email }
		: { user: req.user.email };
	try {
		const credentials = await Credential.find(status)
			.select('-token')
			.sort('-createdAt');
		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

const getCred = asyncHandler(async (req, res) => {
	try {
		const credentials = await Credential.findById(req.params.id);

		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

const changeCred = asyncHandler(async (req, res) => {
	try {
		const credential = await Credential.findById(req.params.id);
		credential.status = req.body.status;
		const saved = await credential.save();
		res.status(201).json(saved);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

router.post('/', addCred);
router.get('/', getCreds);
router.get('/user', protect, getUserCreds);
router.get('/:id', getCred);
router.put('/:id', changeCred);

export default router;
