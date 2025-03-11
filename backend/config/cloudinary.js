import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// Verify required credentials
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error('Missing Cloudinary credentials:', {
        hasCloudName: !!CLOUD_NAME,
        hasApiKey: !!API_KEY,
        hasApiSecret: !!API_SECRET
    });
    throw new Error('Missing required Cloudinary credentials');
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

// Test configuration
cloudinary.uploader.upload(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    {
        resource_type: 'auto',
        folder: 'test'
    }
)
.then(result => {
    console.log('✅ Cloudinary configuration verified successfully');
})
.catch(error => {
    console.error('❌ Cloudinary configuration test failed:', error.message);
    throw error;
});

export default cloudinary;