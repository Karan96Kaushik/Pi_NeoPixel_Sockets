const server = require('http').createServer();
const io = require('socket.io')(server);
const { spawn } = require('child_process');

io.on('connection', client => {
	console.log("Connected", (new Date()).toLocaleString())
	
	client.on('single', color => {

		// console.log(data)

		const python = spawn('python3', ['neo_single.py', color]);

		python.stdout.on('data', function (data) {
			// console.log('Pipe data from python script ...');
			dataToSend = data.toString();
			// console.log(dataToSend);
		});
	});

	client.on('rainbow', color => {

		const python = spawn('python3', ['neo_rainbow.py']);

		python.stdout.on('data', function (data) {
			// console.log('Pipe data from python script ...');
			dataToSend = data.toString();
			// console.log(dataToSend);
		});
	});
	
	client.on('disconnect', () => {
		console.log("Disconnected", (new Date()).toLocaleString())
	});
});




server.listen(3000);