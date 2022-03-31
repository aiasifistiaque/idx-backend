import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';

const updateCredentialStatus = asyncHandler(async (req, res) => {
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

export default updateCredentialStatus;
