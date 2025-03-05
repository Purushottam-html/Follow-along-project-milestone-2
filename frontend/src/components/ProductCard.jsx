import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, image, price, description, inStock, isNew, discount } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded">
            NEW
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 text-xs font-bold rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-purple-900">
              ${price.toFixed(2)}
            </span>
            {discount && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${(price / (1 - discount/100)).toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <Link 
          to={`/products/${id}`}
          className={`mt-4 block text-center py-2 px-4 rounded-lg transition
            ${inStock 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          onClick={e => !inStock && e.preventDefault()}
        >
          {inStock ? 'View Details' : 'Out of Stock'}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;