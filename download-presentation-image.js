const fs = require('fs');
const path = require('path');

// Function to save the base64 image
const saveImage = () => {
    const imagePath = path.join(__dirname, 'public', 'images', 'poster-presentation.jpg');
    
    // Create a buffer from the base64 string
    const imageData = Buffer.from(`/9j/4AAQSkZJRgABAQEASABIAAD/...`); // Note: Base64 string would be very long
    
    try {
        fs.writeFileSync(imagePath, imageData);
        console.log('Saved presentation image');
    } catch (err) {
        console.error('Error saving image:', err);
    }
};

saveImage();
