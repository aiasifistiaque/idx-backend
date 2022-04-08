import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const getCredential = asyncHandler(async (req, res) => {
	try {
		const credentials = await Credential.findById(req.params.id).populate({
			path: 'issuer',
			select: 'name email',
		});

		res.status(201).json(credentials);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default getCredential;
