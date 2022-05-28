import { world } from 'mojang-minecraft';

export function info(message, playerName, dimension = 'overworld') { return world.getDimension(dimension).runCommand(`tellraw "${playerName}" { "rawtext": [{ "text": "§a${message}§r" }]}`); }
export function error(message, playerName, dimension = 'overworld') { return world.getDimension(dimension).runCommand(`tellraw "${playerName}" { "rawtext": [{ "text": "§cError: ${message}§r" }]}`); }