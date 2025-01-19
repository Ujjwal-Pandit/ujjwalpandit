const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadPoster = () => {
    const url = 'https://drive.google.com/uc?export=download&id=1XZVdf0NtKUGZHrWmP-uwmx2USWozlLhj';
    const filepath = path.join(__dirname, 'public', 'images', 'football-research-poster.jpg');
    
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            // Handle redirect
            https.get(response.headers.location, (response2) => {
                response2.pipe(file);
            });
        } else {
            response.pipe(file);
        }
        
        file.on('finish', () => {
            file.close();
            console.log('Downloaded research poster');
        });
    }).on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.error('Error downloading poster:', err.message);
    });
};

downloadPoster();
