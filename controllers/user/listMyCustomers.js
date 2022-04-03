import asyncHandler from 'express-async-handler';
import express from 'express';
import { User } from '../../models/userModel.js';
import Credential from '../../models/credentialsModel.js';

const listMyCustomers = asyncHandler(async (req, res) => {
	try {
		const data = await Credential.distinct('user', { issuer: req.user.email });
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default listMyCustomers;
