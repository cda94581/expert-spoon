import { EntityIterator, system, world } from '@minecraft/server';
const [ overworld, nether, end ] = [ world.getDimension('minecraft:overworld'), world.getDimension('minecraft:nether'), world.getDimension( 'minecraft:the_end') ];

system.runSchedule(() => {
	// const entities = [...EntityIterator.prototype];
	const entities = [...new Set([].concat(
		[...overworld.getEntities({ name: 'Kuma' })],
		[...nether.getEntities({ name: 'Kuma' })],
		[...end.getEntities({ name: 'Kuma' })]
	))];
	entities.forEach(async entity => {
		await entity.runCommandAsync('playanimation @s animation.namespace.kuma');
		const schedule = system.runSchedule(async () => {
			system.clearRunSchedule(schedule);
			await entity.runCommandAsync('tp ~ -100 ~');
			await entity.runCommandAsync('kill @s');
			world.say({ rawtext: [ 'Kuma was unable to survive the physics of the microbiome.' ] })
		}, 5);
	});
}, 20);