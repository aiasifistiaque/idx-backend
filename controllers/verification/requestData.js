import asyncHandler from 'express-async-handler';
import express from 'express';
import Notification from '../../models/notificationModel.js';
import Datarequest from '../../models/datarequestModel.js';

const requestData = asyncHandler(async (req, res) => {
	try {
		const newItem = new Datarequest({
			issuer: req.user?._id,
			status: 'pending',
			user: req.body.user,
			verification: req.body.verification,
			attributes: req.body.attributes,
		});
		const saved = await newItem.save();
		if (saved) {
			const notification = new Notification({
				issuer: req.user?._id || 'test',
				type: 'approve',
				status: 'pending',
				user: req.body.user,
				target: saved._id,
			});
			await notification.save();
		}
		res.status(201).json(saved);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error' });
	}
});

export default requestData;
