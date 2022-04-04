import asyncHandler from 'express-async-handler';
import express from 'express';
import Notification from '../../models/notificationModel.js';

const getNotifications = asyncHandler(async (req, res) => {
	try {
		const data = await Notification.find({ user: req.user.email }).sort(
			'-createdAt'
		);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getNotifications;
