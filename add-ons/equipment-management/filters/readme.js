import fs from 'fs';

const filePath = `data/commandMeta.json`;
const commandMeta = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const table = [ 'Command | Usage | Description', '--- | --- | ---' ];
for (const [k, v] of Object.entries(commandMeta)) table.push(`\`${k}\` | \`${v.usage}\` | ${v.description}`);

const readme = fs.readFileSync(`${process.env.ROOT_DIR}/README.md`, 'utf-8');
const lines = readme.split('\n');

const begin = lines.findIndex(l => l.includes('<!-- BEGIN COMMAND LIST -->'));
const end = lines.findIndex(l => l.includes('<!-- END COMMAND LIST -->'));

const final = [
	...lines.slice(0, begin + 1),
	...table,
	...lines.slice(end)
];

fs.writeFileSync(`${process.env.ROOT_DIR}/README.md`, final.join('\n').replaceAll('\r',''), 'utf-8');