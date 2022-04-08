import mongoose from 'mongoose';

const attributeSchema = mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		type: { type: String, required: true, default: 'string' },
	},
	{
		timestamps: true,
	}
);

const schema = new mongoose.Schema(
	{
		issuer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		version: {
			type: String,
			required: true,
			trim: true,
			default: '0.1',
		},
		category: {
			type: String,
			required: true,
			trim: true,
			default: 'Personal',
		},
		description: {
			type: String,
			required: true,
		},
		attributes: [attributeSchema],
	},
	{
		timestamps: true,
	}
);

const Template = mongoose.model('Template', schema);

export default Template;
