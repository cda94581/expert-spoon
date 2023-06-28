import { EntityEquipmentInventoryComponent, ItemStack } from '@minecraft/server';

export const log = {
	success: async (target) => target.sendMessage({ rawtext: [{ text: `§aSuccessfully executed command§r` }] }),
	fail: async (target, message) => target.sendMessage({ rawtext: [{ text: `§cError: ${message}§r` }] })
}

export const enchanting = {
	addItem: async (target, slot, item, amount) => {
		// const equipment = EntityEquipmentInventoryComponent.prototype;
		const stack = new ItemStack(item, amount);
		const equipment = target.getComponent('minecraft:equipment_inventory');
		equipment.setEquipment(slot, stack);
		return;
	},
	enchant: async (target, slot, enchants) => {
		// const equipment = EntityEquipmentInventoryComponent.prototype;
		const equipment = target.getComponent('minecraft:equipment_inventory');
		const old = equipment.getEquipment('mainhand');
		const stack = equipment.getEquipment(slot);
		equipment.setEquipment('mainhand', stack);
	
		for (const enchant of enchants) {
			const [ id, level ] = enchant.split(':', 2);
			await target.runCommandAsync(`enchant @s ${id} ${level || '1'}`);
		}
	
		const main = equipment.getEquipment('mainhand');
		equipment.setEquipment(slot, main);
		equipment.setEquipment('mainhand', old);
		return;
	}
}