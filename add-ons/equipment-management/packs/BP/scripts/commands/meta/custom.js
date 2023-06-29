import { enchanting, log } from '../../functions.js';
const slots = [ 'offhand','head','chest','legs','feet' ];

export const commandName = 'custom';
export const usage = `<Selector> <EquipmentSlot:${slots.join('|')}> [Enchantment ID]:[Level][]`;
export const description = 'Manage equipment with more freedom, such as bulk selections and enchants on equipment for other entities.';

export async function custom(source, a) {
	const message = a.join(' ');
	const selector = await parseSelector(message);
	const args = message.slice(selector.length).trim().split(/ +/);
	const slot = args.shift();
	if (!slots.includes(slot)) return log.fail(source, `${slot} is not a valid slot option.`);
;
	const tag = `namespace:selected.${source.name}`;
	await source.runCommandAsync(`execute as ${selector} run tag @s add "${tag}"`);
	const entities = source.dimension.getEntities({ tags: [tag] });

	for (const entity of entities) {
		await enchanting.enchant(entity, slot, args);
		entity.removeTag(tag);
	}
	return log.success(source);
}

export async function customGive(source, a) {
	const item = a.shift();
	const amount = parseInt(a.shift());
	const message = a.join(' ');
	const selector = await parseSelector(message);
	const args = message.slice(selector.length).trim().split(/ +/);
	const slot = args.shift();
	if (!slots.includes(slot)) return log.fail(source, `${slot} is not a valid slot option.`);
;
	const tag = `namespace:selected.${source.name}`;
	await source.runCommandAsync(`execute as ${selector} run tag @s add "${tag}"`);
	const entities = source.dimension.getEntities({ tags: [tag] });

	for (const entity of entities) {
		await enchanting.addItem(entity, slot, item, amount);
		await enchanting.enchant(entity, slot, args);
		entity.removeTag(tag);
	}
	return log.success(source);
}

async function parseSelector(message = '') {
	let selector = '';
	const selectors = [ '*a', '*e', '*p', '*r', '*s' ];
	if (message.startsWith('"')) selector = message.slice(0, message.indexOf('"', 1) + 1);
	else if (selectors.some(s => message.startsWith(s)) && message.slice(2).trim().startsWith('['))
		selector = message.slice(0, message.indexOf(']') + 1);
	else selector = message.split(/ +/)[0];
	
	if (selector.startsWith('*')) selector = selector.replace('*','@');

	return selector;
}