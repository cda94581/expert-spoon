import { enchanting, log } from '../../functions.js';

export const commandName = 'as_legs';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the leggings slot.';

export async function asLegs(source, args) {
	const [ x, y, z ] = args.splice(0, 3).map(parseFloat);
	const stand = source.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];
	await enchanting.enchant(stand, 'legs', args);
	return log.success(source);
}

export async function asLegsGive(source, args) {
	const [ x, y, z ] = args.splice(0, 3).map(parseFloat);
	const stand = source.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];

	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(stand, 'legs', item, amount);
	await enchanting.enchant(stand, 'legs', args);
	return log.success(source);
}