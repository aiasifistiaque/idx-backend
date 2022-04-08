import asyncHandler from 'express-async-handler';
import express from 'express';
import Datarequest from '../../models/datarequestModel.js';

const getDataRequestsOfAService = asyncHandler(async (req, res) => {
	try {
		const data = await Datarequest.find({
			verification: req.params.id,
			status: 'approved',
			issuer: req.user._id,
		})
			.populate({ path: 'issuer', select: 'name' })
			.sort('-updatedAt');
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getDataRequestsOfAService;
