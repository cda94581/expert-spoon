import fs from 'fs';
import { globSync } from 'glob';
import os from 'os';

const system = os.platform(); // Windows is stupid.
const cmd = system === 'win32' ? 'BP\\scripts\\commands\\' : 'BP/scripts/commands/';
const rootCmd = system === 'win32' ? `${process.env.ROOT_DIR}\\.regolith\\tmp\\${cmd}` : `${process.env.ROOT_DIR}/.regolith/tmp/${cmd}`;

const data = JSON.parse(fs.readFileSync(`data/commands.json`, 'utf-8'));
const folders = fs.readdirSync(cmd, 'utf-8').filter(f => fs.statSync(cmd + f).isDirectory());
const files = {};
folders.forEach(f => files[f] = globSync(`${cmd}${f}/**/*.js`.replaceAll('\\', '/') /* Windows is annoying. */)
	.map(f => f.slice(cmd.length))
	.filter(f => !(data._ignore.includes(f) || data._ignore.includes(f.replaceAll('\\', '/') /* I've done too much for Windows. */))));

console.log('Preparing script files');
await pre(cmd, files);

const commandList = {};
const commandMeta = {};
const importList = [];

for (const v of Object.values(files)) for (const file of v) {
	const parent = file.split(/\/|\\/)[0]; // Seriously Windows makes everything harder.
	const parentData = data.folders[parent];
	const module = system === 'win32' ? await import(`file:///${rootCmd}${file}`) : await import(rootCmd + file); // Windows is so dumb.
	const imports = Object.keys(module).filter(k => !['commandName','description','usage'].includes(k));

	importList.push(`import { ${imports.join(', ')} } from './${file.replaceAll('\\', '/') /* Why does Windows exist. */}';`);
	for (const f of imports) {
		const funcPostfix = data.functions[Object.keys(data.functions).find(r => f.match(new RegExp(r)))]?.postfix || '';
		const commandName = module.commandName + (parentData?.postfix || '') + funcPostfix;
		const funcDescPost = data.functions[Object.keys(data.functions).find(r => f.match(new RegExp(r)))]?.descPost || '';
		const funcUsagePre = data.functions[Object.keys(data.functions).find(r => f.match(new RegExp(r)))]?.usagePre || '';
		const cmdDescPost = data.commands[Object.keys(data.commands).find(r => commandName.match(new RegExp(r)))]?.descPost || '';
		const cmdUsagePre = data.commands[Object.keys(data.commands).find(r => commandName.match(new RegExp(r)))]?.usagePre || '';

		commandList[commandName] = f;
		commandMeta[commandName] = {
			description: module.description + (parentData?.descPost || '') + funcDescPost + cmdDescPost,
			usage: `namespace:${commandName} ${cmdUsagePre + funcUsagePre + (parentData?.usagePre || '') + module.usage}`
		};
	}
}

let file = '';
file += importList.join('\n');
file += '\n\nexport const commandList = {\n';
for (const [k, v] of Object.entries(commandList)) file += `\t'${k}': ${v},\n`;
file += '}\n\nexport const commandMeta = ';

let meta = {};
for (const [k, v] of Object.entries(commandMeta)) meta[k] = v;
meta = JSON.stringify(meta, null, '\t');
fs.writeFileSync('data/commandMeta.json', meta, 'utf-8');

file += meta;
fs.writeFileSync(`${cmd}commandList.js`, file, 'utf-8');
console.log('Generated commandList.js file');

console.log('Cleaning script files');
await post(cmd, files);

async function pre(dir, files) {
	for (const v of Object.values(files)) for (const f of v) {
		let file = fs.readFileSync(dir + f, 'utf-8');
		file = file.replaceAll('import {', '// import {');
		fs.writeFileSync(dir + f, file, 'utf-8');
	}
}

async function post(dir, files) {
	for (const v of Object.values(files)) for (const f of v) {
		let file = fs.readFileSync(dir + f, 'utf-8');
		file = file.replaceAll('// import {', 'import {');
		fs.writeFileSync(dir + f, file, 'utf-8');
	}
}