import archiver from 'archiver';
import fs from 'fs';
const { name } = JSON.parse(fs.readFileSync(`${process.env.ROOT_DIR}/config.json`, 'utf-8'));

let settings = process.argv[2];
let exclude = [];
try {
	settings = JSON.parse(settings);
	exclude = settings.exclude;
} catch {}

const output = fs.createWriteStream(`${process.env.ROOT_DIR}/${name}.mcaddon`, 'utf-8');
const archive = archiver('zip', { zlib: { level: 9 }});

['bp', 'rp'].filter(x => !exclude.some(y => y.toLowerCase() == x)).forEach(x => { archive.directory(x.toUpperCase(), x.toLowerCase()); });

archive.file(`${process.env.ROOT_DIR}/README.md`, { name: 'README.md' });

archive.on('error', err => console.error(err));
archive.pipe(output);
archive.finalize();