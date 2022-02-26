# Golem API
Using this configuration system, create and easily import custom golems into Minecraft add-ons!

> Requires **GameTest Framework** to be enabled.

**MIT License**: Feel free to use the scripts and configurations contained in this pack anywhere you'd like. No credit or attribution is required.

## Usage
1. [Download](https://github.com/cda94581/expert-spoon/releases/tag/add-ons.golem-api) and unzip the latest released version of the Golem API, available on your current version.
2. Copy and Paste the `BP/scripts/golems` folder into your work add-on behavior pack, same path.
	- Alternatively, just import the downloaded file and tweak as follows.
	- You can remove the `BP/scripts/golems/golems.example.js` file, if you'd like.
3. Edit the `BP/scripts/golems/golems.js` to add each custom golem.
	- You do not need to touch the `index.js` file.
	- The `golems.example.js` file provides examples for reference.
4. Import the developing add-on, clear any cache as needed, and test it out!

### The `golems.js` File
When you first download and open the `golems.js` file, it will be mostly empty:

```js
export default []
```

You need to write your own golems! The `golems.example.js` file is populated with example placeholders, for reference.

```js
export default [
	{
		identifier: 'example:dragon',
		pattern: [
			'*  ',
			'CCC',
			' C ',
			' C '
		],
		key: {
			'*': 'minecraft:dragon_egg',
			C: 'minecraft:coal_block'
		},
		result: 'minecraft:ender_dragon'
	},
	{
		identifier: 'example:slime',
		pattern: [
			'*S',
			'SS'
		],
		key: {
			'*': 'minecraft:slime',
			S: 'minecraft:slime'
		},
		result: 'minecraft:slime'
	}
]
```

Within the array `[]` are objects `{}`. Each object is an individual golem, and contains the same 4 parameters. If you are familiar with add-on recipes, you'll notice that the syntax for each golem is similar to that of recipes.

**`identifier`** is a unique string for each individual golem. This mainly helps you to identify the golem in your add-on. Additionally, if the system detects a duplicate identifier, it will only register the first golem, helping to check for duplicate golems.

**`pattern`** is an array. Simlar to a recipe's "crafting table", the pattern specifies the layout of the golem. Due to the syntax of the pattern, golems may only be 2D. The "*" character is used to specify the block in which to trigger the golem (e.g. the Pumpkin in Snow/Iron Golems, the Wither Skeleton Skull in Withers). Any additional character is used to specify a unique block.  
Patterns may have as many rows as needed, and rows can be of any length desired, however all rows must have the same length as one another.

**`key`** functions as a dictionary. As mentioned above, the `pattern` array contains characters which represent unique blocks. The `key` object maps each of the unique characters to a block. The key for the key/value pair is the unique character, and the value is the block identifier.    
In order to detect the proper block, please include a namespace. If the block is vanilla, make sure the namespace is `minecraft:`. If a namespace is not present, the golem will not work. The following identifier should be something you can find when running a `/setblock` command.  
Due to the way GameTests work, some blocks do not currently function as expected. This includes but is not limited to skulls.

**`result`** is the final entity that will be spawned once the golem is fully constructed. The value of this should be the entity identifier. The identifier should be something you can find when running a `/summon` command.

For your convenience, registered golems and errors are logged to the Content Log GUI, for validation and fixes.  
**This validation system does not check for proper blocks or entity identifiers.**

The Content Log and Content Log GUI can be activated in the Creator Settings menu.

## Insights
The `index.js` file contains the main logic of the system. Upon initiation, the system imports the `world` class from `mojang-minecraft` and the `userGolems` array from the `golems.js` file. The `userGolems` array is instantly parsed into the `golems` array for the system, and any useful information is sent to the Content Log GUI.

When a block is placed, the system checks all the registered golems to see if the placed block is the trigger block for some of them. For each of the ones that are, the system checks the pattern of the golem, and finds blocks in relation to the trigger block. If all blocks match, the golem succeeds, the blocks are replaced by air, and the entity is spawned. This is repeated for each of the 12 directions:
- X Axis Vertical
- X Axis Vertical Flip
- Z Axis Vertical
- Z Axis Vertical Flip
- Flat 0°
- Flat 0° Flip
- Flat 90°
- Flat 90° Flip
- Flat 180°
- Flat 180° Flip
- Flat 270°
- Flat 270° Flip

The logic in which this is done is way too painful and complicated. Dig through the `index.js` file for yourself if you want. Good luck keeping track of everything.