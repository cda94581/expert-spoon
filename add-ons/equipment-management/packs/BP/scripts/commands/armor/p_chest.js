import { enchanting, log } from '../../functions.js';

export const commandName = 'p_chest';
export const usage = '[Enchantment ID]:[Level][]';
export const description = 'Enchants an item in the chestplate slot.';

export async function pChest(source, args) {
	await enchanting.enchant(source, 'chest', args);
	return log.success(source);
}

export async function pChestGive(source, args) {
	const item = args.shift();
	const amount = parseInt(args.shift());
	await enchanting.addItem(source, 'chest', item, amount);
	await enchanting.enchant(source, 'chest', args);
	return log.success(source);
}