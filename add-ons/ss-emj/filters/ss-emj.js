const fs = require('fs');

const files = fs.readdirSync('data/SS Emojis/downloads').filter(f => f.endsWith('.png'));
	
let array = [];
	
files.forEach((f, i) => {
	const file = f.slice(0, f.length - 4);
	const int = i + 8; const string = int.toString(16).padStart(2, '0');
	const emj = String.fromCodePoint(parseInt(`0xE1${string}`, 16));
	array.push([ file, emj ]);
});
	
const final = `const map = ${JSON.stringify(array).replace(/"/g, '\'')};`;

fs.writeFileSync('BP/scripts/ss-emj.js', fs.readFileSync('BP/scripts/ss-emj.js', 'utf-8').replace('// INSERT EMOJI MAP HERE', final), 'utf-8');