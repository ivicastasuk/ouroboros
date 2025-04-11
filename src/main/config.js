const path = require('path');
const fs = require('fs');

const configPath = path.join(__dirname, '../../config/settings.json');

function loadConfig() {
    try {
        const data = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Greška prilikom učitavanja config fajla:', err);
        return null;
    }
}

module.exports = { loadConfig };
