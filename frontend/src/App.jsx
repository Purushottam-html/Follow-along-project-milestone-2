import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import ProductForm from './components/ProductForm';
import EditProduct from './components/EditProduct';
import UserProducts from './components/UserProducts';
import NavbarComponent from './components/NavbarComponent';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import AddressForm from './components/AddressForm';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Get user email and data from localStorage when app loads
    const email = localStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (email) setUserEmail(email);
    if (userData && userData.name) setUserName(userData.name);
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        <NavbarComponent userEmail={userEmail} userName={userName} />
        <Routes>
          <Route 
            path="/login" 
            element={<Login setUserEmail={setUserEmail} setUserName={setUserName} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp />} 
          />
          <Route
            path="/homepage"
            element={
              <HomePage userEmail={userEmail} userName={userName} />
            }
          />
          <Route
            path="/add-product"
            element={
              userEmail ?
                <ProductForm userEmail={userEmail} /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              userEmail ?
                <EditProduct userEmail={userEmail} /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/my-products"
            element={
              userEmail ?
                <UserProducts userEmail={userEmail} /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/cart"
            element={
              userEmail ?
                <Cart /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              userEmail ?
                <Profile /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/add-address"
            element={
              userEmail ?
                <AddressForm /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/checkout"
            element={
              userEmail ?
                <Checkout /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/my-orders"
            element={
              userEmail ?
                <MyOrders /> :
                <Navigate to="/login" replace />
            }
          />
          <Route path="/" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
