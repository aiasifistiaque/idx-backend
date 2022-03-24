import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: String,
			required: true,
			trim: true,
			default: 'test@identrix.io',
		},
		credentialType: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			required: true,
			trim: true,
			default: 'pending',
		},
		user: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Credential = mongoose.model('Credential', schema);

export default Credential;
