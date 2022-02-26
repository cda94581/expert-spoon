const querystring = require('querystring');
const https = require('https');
const fs = require('fs');
const glob = require('glob');
const jsMin = require('./scripts');

const query = querystring.stringify({ input: fs.readFileSync(`BP/scripts/golems/index.js`, 'utf-8') });
const stream = fs.createWriteStream(`BP/scripts/golems/index.js`, 'utf-8');

const req = https.request({ method: 'POST', hostname: 'www.toptal.com', path: '/developers/javascript-minifier/raw', }, (resp) => resp.pipe(stream));
req.on('error', err => { throw (err) });
req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
req.setHeader('Content-Length', query.length);
req.end(query, 'utf8');

glob('BP/**/*.json', (err, files) => {
	files.forEach(file => {
		const f = fs.readFileSync(file, 'utf-8');
		fs.writeFileSync(file, jsMin(f), 'utf-8');
	});
});