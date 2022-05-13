import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { onSocketConnection } from './socket/index.js';
import credRoute from './routes/credRoute.js';
import authRoute from './routes/authRoute.js';
import templateRoute from './routes/templateRoute.js';
import verificationServiceRoute from './routes/verificationServiceRoute.js';
import userRoute from './routes/userRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import decodeRoute from './routes/decodeRoute.js';
import dataRequestRoute from './routes/datarequestRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import qrRoute from './routes/qrRoute.js';

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
app.use('/notifications', notificationRoute);
app.use('/decode', decodeRoute);
app.use('/datarequest', dataRequestRoute);
app.use('/transactions', transactionRoute);
app.use('/qr', qrRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 5000;

const httpServer = createServer(app);
export const io = new Server(httpServer, {
	serveClient: false,
	cors: {
		origin: 'https://idx-client.vercel.app',
	},
});

// io.on('connection', socket => {
// 	// ...
// });

//io.on('connection', onSocketConnection);
io.on('connection', socket => {
	console.log(`a connection was estublished ${socket.id}`);
	//console.log(socket.handshake.query);
	const ip = socket.handshake.query.ip;
	console.log(socket.handshake.query.ip);
	socket.join(ip);

	socket.on('disconnect', () => {
		socket.leave(ip);
		console.log(`Disconnected: ${socket.id}`);
	});
});

httpServer.listen(port, console.log(`Server running on socket port ${port}`));

//app.listen(port, console.log(`Server running on port ${port}`));
