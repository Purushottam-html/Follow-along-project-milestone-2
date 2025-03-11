import Product from '../models/productModel.js';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

const DEFAULT_IMAGE = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const uploadToCloudinary = async (file) => {
    try {
        const stream = Readable.from(file.buffer);
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'products',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) {
                        console.error('[Cloudinary] Upload error:', error);
                        reject(error);
                    } else {
                        console.log('[Cloudinary] Upload success:', result.secure_url);
                        resolve(result.secure_url);
                    }
                }
            );
            stream.pipe(uploadStream);
        });
    } catch (error) {
        console.error('[Cloudinary] Error:', error);
        throw error;
    }
};

export const createProduct = async (req, res) => {
    try {
        let imageUrl = DEFAULT_IMAGE;

        if (req.file) {
            console.log('[Create Product] Uploading image to Cloudinary');
            imageUrl = await uploadToCloudinary(req.file);
        }

        const productData = {
            ...req.body,
            imageUrl,
            price: Number(req.body.price)
        };

        const product = await Product.create(productData);
        console.log('[Create Product] Created product successfully');

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('[Create Product] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('[Update Product] Updating product:', id);

        let updateData = { ...req.body };

        // Handle image upload if new file is provided
        if (req.file) {
            console.log('[Update Product] Uploading new image to Cloudinary');
            const newImageUrl = await uploadToCloudinary(req.file);
            updateData.imageUrl = newImageUrl;
        }

        // Convert price to number if provided
        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        // Verify user owns this product
        if (product.userEmail !== req.body.userEmail) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this product'
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        console.log('[Update Product] Product updated successfully');

        res.json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        console.error('[Update Product] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.query;
        console.log('[Delete Product] Attempting to delete product:', id);

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        // Verify user owns this product
        if (product.userEmail !== userEmail) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this product'
            });
        }

        await Product.findByIdAndDelete(id);
        console.log('[Delete Product] Product deleted successfully');

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('[Delete Product] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        console.log('[Get All] Found products count:', products.length);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('[Get All] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductsByUserEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const products = await Product.find({ userEmail: email }).lean();
        console.log('[Get User Products] Found products count:', products.length);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('[Get User Products] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).lean();
        
        if (!product) {
            console.log('[Get Product] Product not found:', id);
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('[Get Product] Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};