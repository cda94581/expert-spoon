import { commandList } from './commands/commandList.js';
import { log } from './functions.js';

import { system } from '@minecraft/server';

system.events.scriptEventReceive.subscribe(async ({ id, message, sourceEntity }) => {
	if (sourceEntity?.typeId !== 'minecraft:player') return;
	if (!sourceEntity.isOp()) return log.fail(sourceEntity, 'You need to be OP to use this system.');
	const [ ns, command ] = id.split(':');
	if (ns !== 'namespace') return;
	if (!commandList[command]) return log.fail(sourceEntity, `Unregonized command: ${command}`);
	const args = message.split(/ +/);
	return await commandList[command](sourceEntity, args);
});