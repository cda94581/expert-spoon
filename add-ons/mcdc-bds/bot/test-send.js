const http = require('http');
const { port } = require('./config.json');

const request = http.request({
	host: 'localhost',
	port,
	method: 'POST',
	path: '/mcdc/send'
}, res => console.log(res.statusCode));

request.write(JSON.stringify({
	name: 'YOUR NAME HERE',
	message: 'YOUR MESSAGE HERE'
}));

request.end();