const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://www.wpi.edu/sites/default/files/wpi-primary-logo.png',
        filename: 'wpi-logo.png'
    },
    {
        url: 'https://www.nku.edu/content/dam/nkuhome/images/NKU_Logo.png',
        filename: 'nku-logo.png'
    },
    {
        url: 'https://new.assistments.org/img/assistments-logo.png',
        filename: 'assistments-logo.png'
    }
];

const downloadImage = (url, filename) => {
    const filepath = path.join(__dirname, 'public', 'images', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.error(`Error downloading ${filename}:`, err.message);
    });
};

images.forEach(img => downloadImage(img.url, img.filename));
