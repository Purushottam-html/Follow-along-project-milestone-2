import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

// Use memory storage for temporary file handling
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        return cb(new Error('File size too large! Maximum size is 5MB.'), false);
    }

    cb(null, true);
};

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Middleware to handle file upload
export const uploadMiddleware = (fieldName) => {
    return async (req, res, next) => {
        upload.single(fieldName)(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error('[Upload] Multer error:', err);
                return res.status(400).json({ 
                    success: false,
                    error: 'File upload error',
                    details: err.message 
                });
            }
            
            if (err) {
                console.error('[Upload] Other error:', err);
                return res.status(400).json({ 
                    success: false,
                    error: err.message 
                });
            }

            // If no file was uploaded, continue without error
            if (!req.file) {
                console.log('[Upload] No file uploaded, continuing...');
                return next();
            }

            try {
                console.log('[Upload] Processing file:', {
                    originalname: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                });

                // Convert buffer to base64
                const b64 = Buffer.from(req.file.buffer).toString('base64');
                const dataURI = `data:${req.file.mimetype};base64,${b64}`;

                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: 'products',
                    resource_type: 'auto',
                });

                console.log('[Upload] Cloudinary upload successful:', {
                    url: result.secure_url,
                    publicId: result.public_id
                });

                // Add Cloudinary URL to request body
                req.body.imageUrl = result.secure_url;
                next();
            } catch (error) {
                console.error('[Upload] Cloudinary upload error:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to upload image',
                    details: error.message
                });
            }
        });
    };
};