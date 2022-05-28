const http = require('http');
const { port } = require('./config.json');

const request = http.request({
	host: 'localhost',
	port,
	method: 'GET',
	path: '/mcdc/fetch'
}, res => {
	if (res.statusCode == 400) return console.log('No new messages');
	let body = [];
	res.on('data', d => body.push(d)).on('end', () => {
		body = JSON.parse(Buffer.concat(body).toString());
		body.forEach(msg => console.log(msg));
	});
});

request.end();