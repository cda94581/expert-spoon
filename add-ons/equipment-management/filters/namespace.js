// Packages
import { globSync } from 'glob';
import fs from 'fs-extra';

// Defaults
const oldNamespace = 'namespace'

// User
const { namespace } = JSON.parse(fs.readFileSync(`${process.env.ROOT_DIR}/config.json`, 'utf-8'));

globSync('@(B|R)P/**/*.@(json|js|lang)').forEach(f => {
	let file = fs.readFileSync(f, 'utf-8');
	file = file.replace(new RegExp(oldNamespace, 'g'), namespace);
	fs.outputFileSync(f, file, 'utf-8');
});
globSync('data/**/*.@(json|js|lang)').forEach(f => {
	let file = fs.readFileSync(f, 'utf-8');
	file = file.replace(new RegExp(oldNamespace, 'g'), namespace);
	fs.outputFileSync(f, file, 'utf-8');
});