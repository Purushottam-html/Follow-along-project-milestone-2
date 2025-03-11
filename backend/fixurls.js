import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const fixUrls = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find all products with localhost URLs
        const products = await Product.find({
            imageUrl: /^http:\/\/localhost/
        });

        console.log(`Found ${products.length} products with localhost URLs`);

        // Update each product
        for (const product of products) {
            product.imageUrl = 'https://via.placeholder.com/300';
            await product.save();
            console.log(`Updated product ${product._id}`);
        }

        console.log('Finished updating URLs');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixUrls();