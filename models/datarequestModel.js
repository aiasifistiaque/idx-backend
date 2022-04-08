import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
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
		data: [],
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
