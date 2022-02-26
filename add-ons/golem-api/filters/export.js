const archiver = require('archiver');
const fs = require('fs');
const { name } = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'));

const output = fs.createWriteStream(`../../${name}.mcaddon`, 'utf-8');
const archive = archiver('zip', { zlib: { level: 9 }});

archive.directory('BP', 'bp').on('error', err => console.error(err)).pipe(output);
archive.finalize();