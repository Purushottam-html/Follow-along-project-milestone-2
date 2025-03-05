import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, name, imageUrl, price, description } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-900">
            ${price.toFixed(2)}
          </span>
        </div>
        
        <Link 
          to={`/products/${_id}`}
          className="mt-4 block text-center py-2 px-4 rounded-lg transition
            bg-purple-600 hover:bg-purple-700 text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;