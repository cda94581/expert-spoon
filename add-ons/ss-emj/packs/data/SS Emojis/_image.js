const fs = require('fs');
const canvas = require('canvas');

const size = parseInt(process.argv[2]);
const dim = size * 16;

const draw = canvas.createCanvas(dim, dim);
const context = draw.getContext('2d');
const files = fs.readdirSync('.downloads/').filter(f => f.endsWith('.png'));

async function main() {
	await canvas.loadImage(`.glyph_E1_${dim}.png`).then(image => context.drawImage(image, 0, 0));
	let i = 0;
	while (i < files.length) {
		const file = files[i];
		const place = i + 8;
		const x = (place % 16) * size;
		const y = Math.floor(place / 16) * size;
		await canvas.loadImage(file).then(image => {
			let shiftX = 0;
			const width = image.width;
			if (width != size) shiftX += Math.floor((size - width) / 2);
			let shiftY = 0;
			const height = image.height;
			if (height != size) shiftY += Math.floor((size - height) / 2);

			context.drawImage(image, x + shiftX, y + shiftY);
			console.log(`Added ${file}`);
		});
		i++;
	}

	const buffer = draw.toBuffer('image/png');
	fs.writeFileSync('.finished.png', buffer);
}

main();