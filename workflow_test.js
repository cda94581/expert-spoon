const fs = require('fs');
console.log(fs.readdirSync('.', 'utf-8'));
fs.writeFileSync(process.env.GITHUB_OUTPUT, 'TEST=hi how are you');
console.log(fs.readdirSync('.', 'utf-8'));