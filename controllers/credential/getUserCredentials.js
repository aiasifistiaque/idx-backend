import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getUserCredentials = asyncHandler(async (req, res) => {
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

export default getUserCredentials;
