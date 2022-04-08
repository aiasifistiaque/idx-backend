import asyncHandler from 'express-async-handler';
import express from 'express';
import Datarequest from '../../models/datarequestModel.js';
import Notification from '../../models/notificationModel.js';
import Credential from '../../models/credentialsModel.js';
import jwt from 'jsonwebtoken';

const editDataRequest = asyncHandler(async (req, res) => {
	const { status, credential } = req.body;
	try {
		const data = await Datarequest.findById(req.body.id).populate([
			{
				path: 'verification',
				select: 'template',
			},
			{ path: 'issuer' },
		]);
		data.status = req.body.status;

		console.log(data);

		if (status == 'approved') {
			const credential = await Credential.findOne({
				user: req.user.email,
				template: data.verification.template,
			});

			if (!credential) {
				data.status = 'denied';
				const update = await data.save();
				const notification = await Notification.findById(req.body.notification);
				notification.status = 'seen';
				await notification.save();
				return res.status(200).json(update);
			}
			const decoded = jwt.verify(credential.token, process.env.JWT_PRIVATE_KEY);
			const foundAttributes = [];
			data.attributes.map(item => {
				const newItem = { attribute: item, value: decoded[item] };
				foundAttributes.push(newItem);
			});
			data.data = foundAttributes;
		}
		const update = await data.save();
		const notification = await Notification.findById(req.body.notification);
		notification.status = 'seen';
		await notification.save();
		res.status(200).json(update);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default editDataRequest;
