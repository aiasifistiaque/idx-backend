import asyncHandler from 'express-async-handler';
import Credential from '../../models/credentialsModel.js';
import { User } from '../../models/userModel.js';

const getReceipt = asyncHandler(async (req, res) => {
	try {
		let credential = await Credential.findById(req.params.id).populate([
			{
				path: 'issuer',
				select: 'name email wallet',
			},
			{
				path: 'template',
			},
		]);

		const user = await User.findOne({ email: credential.user }).select(
			'-password'
		);

		res.status(200).json({ credential, user });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getReceipt;
