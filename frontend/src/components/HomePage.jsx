import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavbarComponent.jsx';
import ProductCard from '../components/ProductCard';

const HomePage = ({ userEmail }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Sample anime collections
  const collections = [
    { id: 1, name: "Demon Slayer", imageUrl: "/api/placeholder/400/200", itemCount: 42 },
    { id: 2, name: "My Hero Academia", imageUrl: "/api/placeholder/400/200", itemCount: 38 },
    { id: 3, name: "Attack on Titan", imageUrl: "/api/placeholder/400/200", itemCount: 29 },
    { id: 4, name: "One Piece", imageUrl: "/api/placeholder/400/200", itemCount: 56 },
    { id: 5, name: "Naruto", imageUrl: "/api/placeholder/400/200", itemCount: 47 },
    { id: 6, name: "Jujutsu Kaisen", imageUrl: "/api/placeholder/400/200", itemCount: 31 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userEmail={userEmail} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Ultimate Anime Merchandise Store</h1>
            <p className="text-lg mb-6">Find exclusive collectibles, apparel, and accessories from your favorite anime series.</p>
            <div className="flex space-x-4">
              <Link to="/products" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition">
                Shop Now
              </Link>
              <Link to="/collections" className="bg-transparent hover:bg-white hover:text-purple-900 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition">
                View Collections
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/api/placeholder/500/400" alt="Anime Merchandise" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900">Featured Products</h2>
          <Link to="/products" className="text-pink-600 hover:text-pink-800 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Collections Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-900">Popular Collections</h2>
            <Link to="/collections" className="text-pink-600 hover:text-pink-800 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Link key={collection.id} to={`/collections/${collection.id}`} className="group">
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
      
      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">AniMerch</h4>
              <p className="text-purple-200 mb-4">Your trusted source for premium anime merchandise and collectibles.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-pink-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-white hover:text-pink-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
                <a href="#" className="text-white hover:text-pink-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-purple-200 hover:text-white transition">All Products</Link></li>
                <li><Link to="/collections" className="text-purple-200 hover:text-white transition">Collections</Link></li>
                <li><Link to="/new-arrivals" className="text-purple-200 hover:text-white transition">New Arrivals</Link></li>
                <li><Link to="/sale" className="text-purple-200 hover:text-white transition">Sale Items</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-purple-200 hover:text-white transition">Help Center</Link></li>
                <li><Link to="/shipping" className="text-purple-200 hover:text-white transition">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-purple-200 hover:text-white transition">Returns & Exchanges</Link></li>
                <li><Link to="/contact" className="text-purple-200 hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-purple-200 hover:text-white transition">Our Story</Link></li>
                <li><Link to="/blog" className="text-purple-200 hover:text-white transition">Blog</Link></li>
                <li><Link to="/careers" className="text-purple-200 hover:text-white transition">Careers</Link></li>
                <li><Link to="/privacy" className="text-purple-200 hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-300">
            <p>&copy; 2025 AniMerch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
