import { enchanting, log } from '../../functions.js';

export const commandName = 'p_feet';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the boots slot.';

export async function pFeet(source, args) {
	await enchanting.enchant(source, 'feet', args);
	return log.success(source);
}

export async function pFeetGive(source, args) {
	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(source, 'feet', item, amount);
	await enchanting.enchant(source, 'feet', args);
	return log.success(source);
}