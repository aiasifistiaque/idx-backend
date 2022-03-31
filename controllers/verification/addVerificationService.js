import asyncHandler from 'express-async-handler';
import express from 'express';
import Verificaction from '../../models/verificationModel.js';

const addVerificationService = asyncHandler(async (req, res) => {
	const { name, endpoint, key, description, attributes } = req.body.data;
	const issuer = req.user.email;

	try {
		const newItem = new Verificaction({
			issuer: issuer ? issuer : 'test@identrix.io',
			name,
			description,
			endpoint,
			key,
			attributes,
		});
		const saved = await newItem.save();
		res.status(201).json(saved);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default addVerificationService;
