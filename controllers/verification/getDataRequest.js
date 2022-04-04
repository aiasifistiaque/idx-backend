import asyncHandler from 'express-async-handler';
import express from 'express';
import Datarequest from '../../models/datarequestModel.js';

const getDataRequest = asyncHandler(async (req, res) => {
	try {
		const data = await Datarequest.findById(req.params.id);

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getDataRequest;
