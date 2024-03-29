import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import ethers from 'ethers';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/login', async (req, res) => {
	const { error } = loginValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('email id does not exist');

	if (user.role == 'banned') return res.status(400).send('banned user');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) res.status(400).send('wrong password');

	if (!user.wallet) {
		const privateKey = '0x' + crypto.randomBytes(32).toString('hex');
		user.wallet = privateKey;
		await user.save();
	}

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		e => console.log(e);
	}
});

router.post('/register', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already registered..');

	const privateKey = '0x' + crypto.randomBytes(32).toString('hex');
	var wallet = new ethers.Wallet(privateKey);
	req.body.wallet = privateKey;

	user = new User(
		_.pick(req.body, ['name', 'email', 'password', 'role', 'wallet'])
	);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	try {
		await user.save();

		const token = user.generateAuthToken();
		res.status(200).header('x-auth-token', token).send(`Bearer ${token}`);
	} catch (e) {
		console.log(e);
		res.status(500).send('Internal Server Error');
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;
