import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		user: {
			type: String,
			required: true,
			trim: true,
		},

		attributes: [],
		status: {
			type: String,
			required: true,
			trim: true,
			default: 'pending',
		},
		verificationService: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Verification',
		},
	},
	{
		timestamps: true,
	}
);

const Request = mongoose.model('Request', schema);

export default Request;
