// Import Modules
import { world } from 'mojang-minecraft';
import userGolems from './golems.js';

// Register Golems
let golems = [];
userGolems.forEach((e, n) => {
	// Validate all properties & types
	if (e.identifier == undefined) return console.warn(`§cMissing Property: '§bidentifier§c' at §bGolem ${n + 1}§c.§r`);
	if (typeof e.identifier != 'string') return console.warn(`§cProperty '§bidentifier§c' at §bGolem ${n + 1}§c is not a string.§r`);
	if (e.pattern == undefined) return console.warn(`§cMissing Property: '§bpattern§c' at §bGolem ${n + 1}§c.§r`);
	if (!Array.isArray(e.pattern)) return console.warn(`§cProperty '§bpattern§c' at §bGolem ${n + 1}§c is not an array.§r`);
	if (e.key == undefined) return console.warn(`§cMissing Property: '§bkey§c' at §bGolem ${n + 1}§c.§r`);
	if (typeof e.key != 'object' || Array.isArray(e.key)) return console.warn(`§cProperty '§bkey§c' at §bGolem ${n + 1}§c is not an object.§r`);
	if (e.result == undefined) return console.warn(`§cMissing Property: '§bresult§c' at §bGolem ${n + 1}§c.§r`);
	if (typeof e.result != 'string') return console.warn(`§cProperty '§bresult§c' at §bGolem ${n + 1}§c is not a string.§r`);

	// Identical Exists
	if (golems.some(g => g.identifier == e.identifier)) return console.warn(`§cAnother Golem with the identifier §b${e.identifier}§c already exists! §bGolem ${n + 1}§c has been skipped from registration. Please make sure all identifiers are unique.§r`);

	// Width/Height & Trigger Location
	let width = 0;
	const height = e.pattern.length;
	let tLoc = { x: null, y: null };
	e.pattern.forEach((r, i) => {
		if (r.length > width) width = r.length;
		if (r.includes('*')) {
			if (tLoc.y != null) return console.warn(`§bGolem ${n + 1}§c has multiple trigger locations. This may cause unexpected consequences.§r`);
			tLoc = { x: r.indexOf('*'), y: i };
		}
	});

	// Trigger Block
	if (tLoc.y == null) return console.warn(`§bGolem ${n + 1}§c has no trigger block! Golem will not be registered.§r`);

	// Pattern Length & Keys
	let keys = [];
	e.pattern.forEach((r, i) => {
		if (r.length != width) console.warn(`§cLength of §brow ${i + 1}§c of the §bpattern§c for §bGolem ${n + 1}§c is too short! This can cause unexpected consequences. Please make sure all rows are the same length.§r`);
		r.split('').forEach(c => {
			if (c == ' ' || keys.includes(c)) return;
			keys.push(c);
		});
	});
	keys.forEach(k => { if (!e.key[k]) return console.warn(`§cMissing key §b${k}§c in §bGolem ${n + 1}§c.§r`); });

	// Initiate Design & Register
	const design = {
		identifier: e.identifier,
		pattern: e.pattern,
		key: e.key,
		result: e.result,
		width: width,
		height: height,
		trigger: tLoc
	}
	golems.push(design);
	return console.warn(`INFO: §aRegistered ${e.identifier}.§r`);
});

// Create Golems
world.events.blockPlace.subscribe(evd => {
	const block = evd.block.id;
	const possible = golems.filter(golem => golem.key['*'] == block);
	if (!possible.length) return;
	const blockLoc = evd.block.location;
	possible.forEach(e => {
		for (let direction = 0; direction < 12; direction++) {
			let pass = true;
			for (let x = 0; x < e.width; x++) {
				for (let y = 0; y < e.height; y++) {
					if (e.pattern[y].charAt(x) == ' ') continue;
					let worldBlockLoc = blockLoc;
					const cases = [
						[0, 4, 6], [1, 5, 7], [8, 10], [9, 11],
						[0, 1, 2, 3], [2, 10, 11], [3, 8, 9], [4, 5], [6, 7]
					];
					cases.forEach((c, i) => {
						if (!c.includes(direction)) return;
						switch (i) {
							case 0: worldBlockLoc = worldBlockLoc.offset(-e.trigger.x + x, 0, 0); break;
							case 1: worldBlockLoc = worldBlockLoc.offset(e.trigger.x - x, 0, 0); break;
							case 2: worldBlockLoc = worldBlockLoc.offset(-e.trigger.x + y, 0, 0); break;
							case 3: worldBlockLoc = worldBlockLoc.offset(e.trigger.x - y, 0, 0); break;
							case 4: worldBlockLoc = worldBlockLoc.offset(0, e.trigger.y - y, 0); break;
							case 5: worldBlockLoc = worldBlockLoc.offset(0, 0, -e.trigger.x + x); break;
							case 6: worldBlockLoc = worldBlockLoc.offset(0, 0, e.trigger.x - x); break;
							case 7: worldBlockLoc = worldBlockLoc.offset(0, 0, e.trigger.x - y); break;
							case 8: worldBlockLoc = worldBlockLoc.offset(0, 0, -e.trigger.x + y); break;
						}
					});
					const worldBlock = evd.dimension.getBlock(worldBlockLoc);
					if (worldBlock.id != e.key[e.pattern[y].charAt(x)]) { pass = false; break; }
				}
				if (!pass) break;
			}
			if (pass) {
				let coord1 = null; let coord2 = null;
				switch (direction) {
					case 0:
						coord1 = blockLoc.offset(-e.trigger.x, e.trigger.y, 0);
						coord2 = blockLoc.offset(-e.trigger.x + e.width - 1, e.trigger.y - e.height + 1, 0);
						break;
					case 1:
						coord1 = blockLoc.offset(-e.trigger.x, e.trigger.y, 0);
						coord2 = blockLoc.offset(e.trigger.x - e.width + 1, e.trigger.y - e.height + 1, 0);
						break;
					case 2:
						coord1 = blockLoc.offset(0, e.trigger.y, -e.trigger.x);
						coord2 = blockLoc.offset(0, e.trigger.y - e.height + 1, -e.trigger.x + e.width - 1);
						break;
					case 3:
						coord1 = blockLoc.offset(0, e.trigger.y, -e.trigger.x);
						coord2 = blockLoc.offset(0, e.trigger.y - e.height + 1, e.trigger.x - e.width + 1);
						break;
					case 4:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(-e.trigger.x + e.width - 1, 0, e.trigger.y - e.height + 1);
						break;
					case 5:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(e.trigger.x - e.width + 1, 0, e.trigger.y - e.height + 1);
						break;
					case 6:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(-e.trigger.x + e.width - 1, 0, e.trigger.y + e.height - 1);
						break;
					case 7:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(e.trigger.x - e.width + 1, 0, e.trigger.y + e.height - 1);
						break;
					case 8:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(-e.trigger.x + e.height - 1, 0, e.trigger.y - e.width + 1);
						break;
					case 9:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(e.trigger.x - e.height + 1, 0, e.trigger.y - e.width + 1);
						break;
					case 10:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(-e.trigger.x + e.height - 1, 0, e.trigger.y + e.width - 1);
						break;
					case 11:
						coord1 = blockLoc.offset(-e.trigger.x, 0, e.trigger.y);
						coord2 = blockLoc.offset(e.trigger.x - e.height + 1, 0, e.trigger.y + e.width - 1);
						break;
				}
				const fillCoords = [ coord1.x, coord1.y, coord1.z, coord2.x, coord2.y, coord2.z ].join(' ');
	
				evd.dimension.runCommand(`fill ${fillCoords} air`);
				evd.dimension.runCommand(`summon ${e.result} ${blockLoc.x} ${blockLoc.y} ${blockLoc.z}`);
				break;
			}
		}
	});
});