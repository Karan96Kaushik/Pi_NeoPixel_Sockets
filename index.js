const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
	console.log("Connected", (new Date()).toLocaleString())
	client.on('event', data => { /* … */ });
	client.on('disconnect', () => {
		console.log("Disconnected", (new Date()).toLocaleString())
	});
});
server.listen(3000);