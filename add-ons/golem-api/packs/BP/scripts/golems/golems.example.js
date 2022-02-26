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