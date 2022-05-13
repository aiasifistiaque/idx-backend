import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getTransactions = asyncHandler(async (req, res) => {
	try {
		const credentials = await Credential.find()
			.sort('-createdAt')
			.select('-token')
			.sort('-createdAt');
		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default getTransactions;
