import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
			default: 'assign',
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
		target: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Notification = mongoose.model('Notification', schema);

export default Notification;
