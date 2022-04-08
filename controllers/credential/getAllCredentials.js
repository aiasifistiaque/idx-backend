import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getAllCredentials = asyncHandler(async (req, res) => {
	const status = req.query.status
		? { status: req.query.status, issuer: req.user._id }
		: { issuer: req.user._id };
	try {
		const credentials = await Credential.find(status)
			.sort('-createdAt')
			.select('-token')
			.sort('-createdAt');
		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default getAllCredentials;
