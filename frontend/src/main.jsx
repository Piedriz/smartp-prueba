import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './pages/Login.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import { Products } from './pages/Products.jsx';
import { Cart } from './pages/Cart.jsx';
import { Admin } from './pages/Admin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
