import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Credential from '../../models/credentialsModel.js';
import Notification from '../../models/notificationModel.js';

const issueJwt = data => {
	const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
	return token;
};

const addCredentials = asyncHandler(async (req, res) => {
	try {
		let simplified = {};
		req.body.data?.map((item, i) => {
			simplified[item.name] = item.value;
		});
		const token = issueJwt(simplified);
		const newCred = new Credential({
			issuer: req.user?.email || 'test',
			credentialType: req.body.template.name,
			status: 'pending',
			token: token,
			user: req.body.user,
			template: req.body.template._id,
		});
		const saved = await newCred.save();
		if (saved) {
			const notification = new Notification({
				issuer: req.user?.email || 'test',
				type: 'assign',
				status: 'pending',
				user: req.body.user,
				target: saved._id,
			});
			await notification.save();
		}
		res.status(201).json({ body: simplified, token });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default addCredentials;
