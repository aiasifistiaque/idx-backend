import asyncHandler from 'express-async-handler';
import express from 'express';
import { User } from '../../models/userModel.js';

const getMyDetails = asyncHandler(async (req, res) => {
	try {
		const data = await User.findById(req.user._id).select('-password');
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getMyDetails;
