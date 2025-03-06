import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage.jsx';
import ProductForm from './components/ProductForm';
import UserProducts from './components/UserProducts';

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Get user email from localStorage when app loads
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route
            path="/add-product"
            element={
              userEmail ?
                <ProductForm userEmail={userEmail} /> :
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
