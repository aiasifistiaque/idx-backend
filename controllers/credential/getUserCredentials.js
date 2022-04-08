import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getUserCredentials = asyncHandler(async (req, res) => {
	const status = req.query.status
		? {
				status: req.query.status,
				user: req.user.email,
				...(req.query.category && { category: req.query.category }),
		  }
		: {
				user: req.user.email,
				...(req.query.category && { category: req.query.category }),
		  };
	try {
		const credentials = await Credential.find(status)
			.populate([
				{
					path: 'issuer',
					select: 'name email',
				},
				{
					path: 'template',
					select: 'name category',
				},
			])
			.sort('-createdAt');

		res.status(200).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default getUserCredentials;
