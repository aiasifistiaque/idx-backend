import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';

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
		res.status(201).json({ body: simplified, token });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

router.post('/', addCred);

export default router;
