const server = require('http').createServer();
const io = require('socket.io')(server);
const { spawn } = require('child_process');

io.on('connection', client => {
	console.log("Connected", (new Date()).toLocaleString())
	update_neo('neo_single.py', '#00ff00')
	setTimeout(() => {
		update_neo('neo_single.py', '#000000')		
	}, 1500);
	
	client.on('single', color => {
		update_neo('neo_single.py', color)
	});

	client.on('rainbow', color => {
		update_neo('neo_rainbow.py')
	});
	
	client.on('disconnect', () => {
		update_neo('neo_single.py', '#ff0000')
		setTimeout(() => {
			update_neo('neo_single.py', '#000000')		
		}, 1500);
		console.log("Disconnected", (new Date()).toLocaleString())
	});
});


function update_neo(state, color) {
	const python = spawn('python3', [state, color]);

		python.stdout.on('data', function (data) {
			// console.log('Pipe data from python script ...');
			dataToSend = data.toString();
			// console.log(dataToSend);
		});
} 


server.listen(3000);