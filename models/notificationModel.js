import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		issuer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
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
