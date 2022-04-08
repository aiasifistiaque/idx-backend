import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';
import jwt from 'jsonwebtoken';

const readMyCredential = asyncHandler(async (req, res) => {
	const { credential } = req.body;

	try {
		const decoded = jwt.verify(credential, process.env.JWT_PRIVATE_KEY);
		res.status(200).json(decoded);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default readMyCredential;
