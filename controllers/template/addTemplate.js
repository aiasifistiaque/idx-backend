import asyncHandler from 'express-async-handler';
import express from 'express';
import Template from '../../models/templateModel.js';

const addTemplate = asyncHandler(async (req, res) => {
	const { name, type, version, description, attributes } = req.body.data;
	console.log(req.body.data);
	const user = req.user;
	try {
		const newTemplate = new Template({
			issuer: user.email,
			name,
			type,
			description,
			attributes,
			version,
		});
		const saved = await newTemplate.save();
		res.status(201).json(saved);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e });
	}
});

export default addTemplate;
