import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        // Get the image file path
        const imageUrl = req.file 
            ? `http://localhost:5000/uploads/${req.file.filename}` 
            : 'https://via.placeholder.com/300';

        // Create product with form data and image URL
        const productData = {
            ...req.body,
            imageUrl,
            price: Number(req.body.price)
        };

        const product = await Product.create(productData);
        
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductsByUserEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const products = await Product.find({ userEmail: email });
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};