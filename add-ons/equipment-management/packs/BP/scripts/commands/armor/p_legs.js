import { enchanting, log } from '../../functions.js';

export const commandName = 'p_legs';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the leggings slot.';

export async function pLegs(source, args) {
	await enchanting.enchant(source, 'legs', args);
	return log.success(source);
}

export async function pLegsGive(source, args) {
	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(source, 'legs', item, amount);
	await enchanting.enchant(source, 'legs', args);
	return log.success(source);
}