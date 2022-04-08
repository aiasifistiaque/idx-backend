import asyncHandler from 'express-async-handler';
import express from 'express';
import Notification from '../../models/notificationModel.js';

const getNotifications = asyncHandler(async (req, res) => {
	const params = req.query.status
		? { status: req.query.status, user: req.user.email }
		: { user: req.user.email };
	try {
		let data = await Notification.find(params)
			.sort('status -createdAt')
			.populate({ path: 'issuer', select: 'name email' });
		//data.sort((a, b) => (a.status > b.status ? 1 : -1));

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getNotifications;
