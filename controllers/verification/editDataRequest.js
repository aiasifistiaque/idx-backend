import asyncHandler from 'express-async-handler';
import express from 'express';
import Datarequest from '../../models/datarequestModel.js';

const editDataRequest = asyncHandler(async (req, res) => {
	try {
		const data = await Datarequest.findById(req.body.id);
		data.status = req.body.status;
		const update = await data.save();
		res.status(200).json(update);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default editDataRequest;
