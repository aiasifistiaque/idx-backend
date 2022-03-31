import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: String,
			required: true,
			trim: true,
			default: 'test@identrix.io',
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
