import { Enchantment, EntityEquipmentInventoryComponent, EquipmentSlot, ItemEnchantsComponent, ItemStack, MessageSourceType, MinecraftItemTypes, system, world } from '@minecraft/server';

// world.afterEvents.blockPlace.subscribe(async ({ block, player }) => {
// 	if (block.typeId !== 'minecraft:bedrock') return;
// 	// const equipment = EntityEquipmentInventoryComponent.prototype;
// 	const equipment = player.getComponent('minecraft:equipment_inventory');
// 	const item = new ItemStack(MinecraftItemTypes.netheriteSword);
// 	// console.warn(item.getComponent('minecraft:enchantments')?.addEnchantment ? true : false)
// 	item.getComponent('minecraft:enchantments').enchantments.addEnchantment(new Enchantment('unbreaking', 3));
// 	console.warn(item.getComponent('minecraft:enchantments').enchantments.hasEnchantment('unbreaking'));
// 	equipment.setEquipment(EquipmentSlot.offhand, item);
// });

system.events.scriptEventReceive.subscribe(async evd => {
	if (evd.sourceEntity.typeId !== 'minecraft:player') return;
	if (evd.id !== 'enchant:offhand') return;
	const args = evd.message.split(/ +/);
	const item = args.shift();
	// const equipment = EntityEquipmentInventoryComponent.prototype;
	const equipment = evd.sourceEntity.getComponent('minecraft:equipment_inventory');
	const old = equipment.getEquipment(EquipmentSlot.mainhand)?.clone();
	equipment.setEquipment(EquipmentSlot.mainhand, new ItemStack(item));
	for (const enchant of args) {
		const [ id, level ] = enchant.split(':', 2);
		await evd.sourceEntity.runCommandAsync(`enchant @s ${id} ${level}`);
	};
	const main = equipment.getEquipment(EquipmentSlot.mainhand)?.clone();
	equipment.setEquipment(EquipmentSlot.offhand, main);
	equipment.setEquipment(EquipmentSlot.mainhand, old);
});

system.events.scriptEventReceive.subscribe(async evd => {
	if (evd.sourceEntity.typeId !== 'minecraft:player') return;
	if (evd.id !== 'enchant:armor_stand') return;
	const args = evd.message.split(/ +/);
	const [ x, y, z, slot ] = [ parseInt(args.shift()), parseInt(args.shift()), parseInt(args.shift()), args.shift() ];
	const stand = evd.sourceEntity.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];
	// const equipment = EntityEquipmentInventoryComponent.prototype;
	const equipment = stand.getComponent('minecraft:equipment_inventory');
	const old = equipment.getEquipment(EquipmentSlot.mainhand)?.clone();
	const slotItem = equipment.getEquipment(EquipmentSlot[slot])?.clone();
	equipment.setEquipment(EquipmentSlot.mainhand, slotItem);
	for (const enchant of args) {
		const [ id, level ] = enchant.split(':', 2);
		await stand.runCommandAsync(`enchant @s ${id} ${level}`);
	};
	const main = equipment.getEquipment(EquipmentSlot.mainhand)?.clone();
	equipment.setEquipment(EquipmentSlot[slot], main);
	equipment.setEquipment(EquipmentSlot.mainhand, old);
});

system.events.scriptEventReceive.subscribe(async evd => {
	if (evd.sourceEntity.typeId !== 'minecraft:player') return;
	if (evd.id !== 'enchant:armor_stand_offhand') return;
	const [ x, y, z ] = evd.message.split(/ +/).map(parseInt);
	const item = evd.message.split(/ +/)[3];
	const stand = evd.sourceEntity.dimension.getEntities({ location: { x, y, z }, closest: 1, type: 'minecraft:armor_stand' })[0];
	// const equipment = EntityEquipmentInventoryComponent.prototype;
	const equipment = stand.getComponent('minecraft:equipment_inventory');
	equipment.setEquipment(EquipmentSlot.offhand, new ItemStack(item));
});