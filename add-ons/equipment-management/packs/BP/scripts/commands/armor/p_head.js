import { enchanting, log } from '../../functions.js';

export const commandName = 'p_head';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the helmet slot.';

export async function pHead(source, args) {
	await enchanting.enchant(source, 'head', args);
	return log.success(source);
}

export async function pHeadGive(source, args) {
	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(source, 'head', item, amount);
	await enchanting.enchant(source, 'head', args);
	return log.success(source);
}