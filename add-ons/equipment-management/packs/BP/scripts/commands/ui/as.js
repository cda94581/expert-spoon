import { ModalFormData } from '@minecraft/server-ui';
import formMap from './_formMap.js';
import { commandList } from '../commandList.js';
import { log } from '../../functions.js';

export const commandName = 'as';
export const usage = '';
export const description = 'Enchants an equipment piece.';

const [ slots, modes ] = [ Object.keys(formMap.slot), Object.keys(formMap.mode) ];

export async function asUi(source) {
	const form = new ModalFormData()
		.title('Armor Stand Management')
		.dropdown('Slot', slots, 0)
		.dropdown('Mode', modes, 0)
		.textField(`If above mode is "${modes[1]}", Input an Item`, 'Ex. netherite_sword')
		.textField(`If above mode is "${modes[1]}", Input Quantity`, 'Enter a number')
		.textField('X location', 'Enter a number')
		.textField('Y location', 'Enter a number')
		.textField('Z location', 'Enter a number')
		.textField('Enchantments (Optional) (Separated by Spaces)', 'Ex. sharpness:5 fire_aspect:2');

	const response = await form.show(source);
	if (response.canceled) return;

	const [ slot, mode, item, amount, x, y, z, enchants ] = response.formValues;
	if ((parseFloat(x) === NaN && x !== '0') || (parseFloat(y) === NaN && y !== '0') || (parseFloat(z) === NaN && z !== '0')) return log.fail(source, 'Please make sure the coordinates are inputted properly.');
	if (mode && !(item && parseInt(amount))) return log.fail(source, `If "${modes[1]}" was selected, please input an item and its quantity properly.`);

	const command = `as_${formMap.slot[slots[slot]]}${formMap.mode[modes[mode]]}`;
	const args = [ x, y, z ];
	if (mode) args.push(item, amount);
	args.push(...enchants.split(/ +/));
	return await commandList[command](source, args);
}