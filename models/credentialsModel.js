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
			required: true,
			ref: 'Template',
		},
		credentialType: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
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
