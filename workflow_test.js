const fs = require('fs');
console.log(fs.readdirSync('.', 'utf-8'));
fs.writeFileSync('$GITHUB_ENV', 'TEST=hi how are you');
console.log(fs.readdirSync('.', 'utf-8'));