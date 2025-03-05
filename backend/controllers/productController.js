import Product from '../models/productModel.js';

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            imageUrl
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};