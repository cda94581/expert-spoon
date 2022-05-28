import { DynamicPropertiesDefinition, ExplosionOptions, world } from 'mojang-minecraft';
import { info, error } from './functions.js';
const prefix = '-tnt ';
const commands = new Map();
const tag = 'admin';
const power = {
	'minecraft:tnt': 4,
	'minecraft:tnt_minecart': 3
};

world.events.worldInitialize.subscribe(evd => {
	const property = new DynamicPropertiesDefinition()
	property.defineBoolean('namespace:enabled');
	evd.propertyRegistry.registerWorldDynamicProperties(property);
	commands.set('enable', (evd, args) => {
		if (!evd.sender.hasTag(tag)) return error(`Missing the required tag to execute this command: ${tag}`, evd.sender.name);
		world.setDynamicProperty('namespace:enabled', true);
		return info(`Successfully enabled the module.`, evd.sender.name);
	});
	commands.set('disable', (evd, args) => {
		if (!evd.sender.hasTag(tag)) return error(`Missing the required tag to execute this command: ${tag}`, evd.sender.name);
		world.setDynamicProperty('namespace:enabled', false);
		return info(`Successfully disabled the module.`, evd.sender.name);
	});
	commands.set('isenabled', (evd, args) => {
		if (!evd.sender.hasTag(tag)) return error(`Missing the required tag to execute this command: ${tag}`, evd.sender.name);
		return info(`Module is ${world.getDynamicProperty('namespace:enabled') ? 'enabled' : 'disabled'}.`, evd.sender.name);
	});
});

world.events.beforeChat.subscribe(evd => {
	if (!evd.message.startsWith(prefix)) return;
	const args = evd.message.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!commands.has(command)) return;
	evd.cancel = true;
	commands.get(command)(evd, args);
});

world.events.beforeExplosion.subscribe(evd => {
	if (!world.getDynamicProperty('namespace:enabled')) return;
	const { source } = evd;
	if (!source) return;
	if (!Object.keys(power).includes(source.id)) return;
	evd.cancel = true;

	let explosion = new ExplosionOptions();
	explosion.breaksBlocks = false;
	evd.dimension.createExplosion(source.location, power[source.id], explosion);
	evd.impactedBlocks.forEach(block => evd.dimension.runCommand(`setblock ${block.x} ${block.y} ${block.z} air 0 destroy`));
});