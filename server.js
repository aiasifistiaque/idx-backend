import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import credRoute from './routes/credRoute.js';
import authRoute from './routes/authRoute.js';
import templateRoute from './routes/templateRoute.js';
import verificationServiceRoute from './routes/verificationServiceRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes
// app.use('/api/auth', authRoute);
app.use('/template', templateRoute);
app.use('/issue', credRoute);
app.use('/auth', authRoute);
app.use('/verify', verificationServiceRoute);
app.use('/user', userRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
