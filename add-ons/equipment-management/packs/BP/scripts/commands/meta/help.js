import { commandMeta } from '../commandList.js'

export const commandName = 'help';
export const usage = '[command]';
export const description = 'Gets a list of all commands and its usage.';

export async function help(source, args) {
	const command = args[0];
	let response = '§☆---\n';
	if (commandMeta[command]) response += info(command, commandMeta[command].description, commandMeta[command].usage);
	else for (const [k, v] of Object.entries(commandMeta)) response += info(k, v.description, v.usage);
	return source.sendMessage(response);
}

function info(command, description, usage) { return `§a${command}§r: ${description}\n§bUsage§r: ${usage}\n---\n`; }