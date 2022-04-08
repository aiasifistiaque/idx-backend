import asyncHandler from 'express-async-handler';
import Template from '../../models/templateModel.js';

const getAllTemplates = asyncHandler(async (req, res) => {
	try {
		const data = await Template.find({ issuer: req.user._id })
			.sort('-createdAt')
			.populate({ path: 'issuer', select: 'name email' });
		res.status(201).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getAllTemplates;
