import { enchanting, log } from '../../functions.js';

export const commandName = 'as_feet';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the boots slot.';

export async function asFeet(source, args) {
	const [ x, y, z ] = args.splice(0, 3).map(parseFloat);
	const stand = source.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];
	await enchanting.enchant(stand, 'feet', args);
	return log.success(source);
}

export async function asFeetGive(source, args) {
	const [ x, y, z ] = args.splice(0, 3).map(parseFloat);
	const stand = source.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];

	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(stand, 'feet', item, amount);
	await enchanting.enchant(stand, 'feet', args);
	return log.success(source);
}