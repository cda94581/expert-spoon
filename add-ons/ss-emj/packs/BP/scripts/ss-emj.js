import { world } from 'mojang-minecraft';

// INSERT EMOJI MAP HERE

world.events.beforeChat.subscribe(evd => {
	for (let item of map) evd.message = evd.message.replace(RegExp(`:${item[0]}:`, 'g'), item[1]);
});