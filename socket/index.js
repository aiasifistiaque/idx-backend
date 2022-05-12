//

import { io } from '../server.js';

export const onSocketConnection = socket => {
	console.log(`a connection was estublished ${socket.id}`);

	console.log(socket.handshake.query);

	socket.emit('connected', socket.id);

	//const chatRoomId = socket.handshake.query['chatRoomId'];
	console.log('num of connections', io.engine.clientsCount);

	socket.on('disconnect', () => {
		console.log(`Disconnected: ${socket.id}`);
	});
};
