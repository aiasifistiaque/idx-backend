import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getAllCredentials = asyncHandler(async (req, res) => {
	const status = req.query.status
		? { status: req.query.status, issuer: req.user._id }
		: { issuer: req.user._id };
	try {
		if (req.query.status == 'global') {
			const globals = await Credential.find()
				.populate({ path: 'issuer', select: 'name email' })
				.sort('-createdAt')
				.select('-token')
				.sort('-createdAt');
			res.status(201).json(globals);
		} else {
			const credentials = await Credential.find(status)

				.sort('-createdAt')
				.select('-token')
				.sort('-createdAt');
			res.status(201).json(credentials);
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default getAllCredentials;
