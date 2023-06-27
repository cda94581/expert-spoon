const glob = require('glob');
const fs = require('fs');
const files = glob.sync('data/models/**/*.json');
const boneNames = [];

files.forEach(file => {
	const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
	const fv = data.format_version.split('.')[1];
	if (fv < 12) {
		Object.entries(data).forEach(([key, value]) => {
			if (!key.startsWith('geometry.')) return;
			value.bones?.forEach(bone => boneNames.push(bone.name));
		});
	} else data['minecraft:geometry'].forEach(geo => geo.bones.forEach(bone => boneNames.push(bone.name)));
});

const bNCondensed = [...new Set(boneNames)];

let bones = {}

bNCondensed.forEach(bone => {
	bones[bone] = {
		scale: {
			0.0: [ 1, 1, 1 ],
			0.25: [ 0, 0, 0 ]
		}
	}
});

const anim = {
	format_version: '1.18.20',
	animations: {
		'animation.namespace.kuma': {
			animation_length: 0.5,
			bones
		}
	}
};

fs.writeFileSync(`RP/animations/kuma.animation.json`, JSON.stringify(anim), 'utf-8');