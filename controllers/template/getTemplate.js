import asyncHandler from 'express-async-handler';
import Template from '../../models/templateModel.js';

const getTemplate = asyncHandler(async (req, res) => {
	try {
		const data = await Template.findById(req.params.id).populate({
			path: 'issuer',
			select: 'name email',
		});
		res.status(201).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default getTemplate;
