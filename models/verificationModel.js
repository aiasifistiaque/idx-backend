import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		template: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Template',
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		endpoint: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
		attributes: [],
	},
	{
		timestamps: true,
	}
);

const Verification = mongoose.model('Verification', schema);

export default Verification;
