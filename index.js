const server = require('http').createServer();
const io = require('socket.io')(server);
const { spawn } = require('child_process');



io.on('connection', client => {
	console.log("Connected", (new Date()).toLocaleString())
	client.on('event', data => {

		console.log(data)

		const python = spawn('python3', ['neo_single.py', data]);

		python.stdout.on('data', function (data) {
			console.log('Pipe data from python script ...');
			dataToSend = data.toString();
			console.log(dataToSend);
		});

		python.on('close', (code) => {
			console.log(`child process close all stdio with code ${code}`);
		});
	});
	client.on('disconnect', () => {
		console.log("Disconnected", (new Date()).toLocaleString())
	});
});




server.listen(3000);