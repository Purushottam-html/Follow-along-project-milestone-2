import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const ProductCard = ({ product, isUserProduct, onDelete }) => {
  const { _id, name, imageUrl, price, description, userEmail } = product;
  const [imgError, setImgError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (url) => {
    if (!url || imgError) return DEFAULT_IMAGE;
    if (url.includes('localhost:5000')) {
      return url.replace('localhost:5000', 'localhost:5001');
    }
    return url;
  };

  const handleEdit = () => {
    navigate(`/edit-product/${_id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/products/${_id}?userEmail=${userEmail}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (data.success) {
        alert('Product deleted successfully');
        if (onDelete) {
          onDelete(_id);
        }
      } else {
        throw new Error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={getImageUrl(imageUrl)}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.log('Image failed to load:', imageUrl);
            setImgError(true);
            e.target.src = DEFAULT_IMAGE;
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-purple-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          <Link 
            to={`/products/${_id}`}
            className="block text-center py-2 px-4 rounded-lg transition bg-purple-600 hover:bg-purple-700 text-white"
          >
            View Details
          </Link>

          {isUserProduct && (
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="flex-1 py-2 px-4 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`flex-1 py-2 px-4 rounded-lg transition text-white ${
                  isDeleting 
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;