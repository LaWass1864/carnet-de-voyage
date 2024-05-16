const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'src/data.json');  // Chemin vers ton fichier JSON
const destination = path.join(__dirname, 'build/data.json');  // Chemin vers le dossier de build

fs.copyFileSync(source, destination);
console.log('data.json has been copied to the build folder');
