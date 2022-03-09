import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Credential from '../models/credentialsModel.js';

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
			user: 'test@identrix.io',
			credentialType: req.body.template.name,
			status: 'pending',
			token: token,
		});
		const saved = await newCred.save();
		res.status(201).json({ body: simplified, token });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

const getCreds = asyncHandler(async (req, res) => {
	try {
		const credentials = await Credential.find()
			.select('-token')
			.sort('-createdAt');
		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

router.post('/', addCred);
router.get('/', getCreds);

export default router;
