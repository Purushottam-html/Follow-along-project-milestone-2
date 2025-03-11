import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import ProductForm from './components/ProductForm';
import EditProduct from './components/EditProduct';
import UserProducts from './components/UserProducts';
import NavbarComponent from './components/NavbarComponent';

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
          <Route path="/" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
