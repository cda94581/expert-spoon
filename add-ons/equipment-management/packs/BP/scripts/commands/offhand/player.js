import { enchanting, log } from '../../functions.js';

export const commandName = 'p_offhand';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the offhand.';

export async function pOffhand(source, args) {
	await enchanting.enchant(source, 'offhand', args);
	return log.success(source);
}

export async function pOffhandGive(source, args) {
	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(source, 'offhand', item, amount);
	await enchanting.enchant(source, 'offhand', args);
	return log.success(source);
}