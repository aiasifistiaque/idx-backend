import asyncHandler from 'express-async-handler';
import express from 'express';
import Datarequest from '../../models/datarequestModel.js';

const getDataRequests = asyncHandler(async (req, res) => {
	try {
		console.log(req.user);

		const data = await Datarequest.find({ user: req.user.email }).sort(
			'-updatedAt'
		);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getDataRequests;
