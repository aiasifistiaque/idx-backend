import express from 'express';
import { protect } from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import Credential from '../models/credentialsModel.js';
import Verification from '../models/verificationModel.js';
import { User } from '../models/userModel.js';
import _ from 'lodash';
import { io } from '../server.js';

const router = express.Router();

router.post(
	'/',
	protect,
	asyncHandler(async (req, res) => {
		try {
			const user = await User.findById(req.user._id);
			const token = user.generateAuthToken();

			// const credentials = await Credential.findOne({}).populate({
			// 	path: 'issuer',
			// 	select: 'name email',
			// });

			// if (!credentials) {
			// 	res
			// 		.status(404)
			// 		.json({ status: 'error', error: 'Credential not fount', errType: 1 });
			// }
			io.to(req.body.ip).emit('token', `Bearer ${token}`);

			res.status(201).json({ user, data: { body: req.body, token } });
		} catch (e) {
			console.log(e);
			res.status(500).json({ status: 'error', error: e.message });
		}
	})
);

export default router;
