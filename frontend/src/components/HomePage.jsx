import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const HomePage = ({ userEmail }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching all products');
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();

        if (data.success) {
          console.log('Products fetched successfully:', data.data.length);
          // Filter out duplicates by _id
          const uniqueProducts = Array.from(
            new Map(data.data.map(item => [item._id, item])).values()
          );
          setProducts(uniqueProducts);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sample anime collections (static data)
  const collections = [
    { id: 1, name: "Demon Slayer", imageUrl: "https://w0.peakpx.com/wallpaper/333/586/HD-wallpaper-demon-slayer-kimetsu-no-yaiba-banner.jpg", itemCount: 42 },
    { id: 2, name: "My Hero Academia", imageUrl: "https://m.media-amazon.com/images/I/71fxf2hIr6L._AC_UF1000,1000_QL80_.jpg", itemCount: 38 },
    { id: 3, name: "Attack on Titan", imageUrl: "https://pbs.twimg.com/media/DHqsIgoUIAAExFl.jpg", itemCount: 29 },
    { id: 4, name: "One Piece", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxW9FrZWd7yQWSA316sZ3T2z1WIaQR9UQKg&s", itemCount: 56 },
    { id: 5, name: "Naruto", imageUrl: "https://i.redd.it/lna6iw05i4hy.jpg", itemCount: 47 },
    { id: 6, name: "Jujutsu Kaisen", imageUrl: "https://i.pinimg.com/736x/28/ef/40/28ef40e53d0036c906c3f7ce5445754f.jpg", itemCount: 31 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Ultimate Anime Merchandise Store</h1>
            <p className="text-lg mb-6">Find exclusive collectibles, apparel, and accessories from your favorite anime series.</p>
            <div className="flex space-x-4">
              <Link to="/homepage" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition">
                Shop Now
              </Link>
              <Link to="/homepage" className="bg-transparent hover:bg-white hover:text-purple-900 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition">
                View Collections
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?width=1080&crop=smart&auto=webp&s=e4d4877f91a0122d4b1a380a39d755b43558bcc9" alt="Anime Merchandise" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900">Featured Products</h2>
          {userEmail && (
            <Link to="/add-product" className="text-pink-600 hover:text-pink-800 font-medium">
              Add Product →
            </Link>
          )}
        </div>
        {products.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No products available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* Collections Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-900">Popular Collections</h2>
            <Link to="/homepage" className="text-pink-600 hover:text-pink-800 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Link key={collection.id} to="/homepage" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name} 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{collection.name}</h3>
                      <p>{collection.itemCount} items</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Otaku Community</h3>
            <p className="text-white text-lg mb-6">Subscribe to get the latest news, exclusive offers, and early access to new merch drops.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 max-w-md w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
