import asyncHandler from 'express-async-handler';
import express from 'express';
import Verification from '../../models/verificationModel.js';

const getVerificationService = asyncHandler(async (req, res) => {
	try {
		const data = await Verification.findById(req.params.id);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getVerificationService;
