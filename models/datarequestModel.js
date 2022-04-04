import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: String,
			required: true,
			trim: true,
			default: 'test@identrix.io',
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
		verification: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Verification',
		},
		attributes: [],
		token: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Datarequest = mongoose.model('Datarequest', schema);

export default Datarequest;
