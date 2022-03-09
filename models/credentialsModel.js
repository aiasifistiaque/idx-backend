import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		user: {
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
