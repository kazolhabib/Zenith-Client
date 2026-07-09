import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

// Placeholder Pages
const About = () => <div className="pt-20 p-8"><h1 className="text-3xl font-bold">About Us</h1></div>;
const Login = () => <div className="pt-20 p-8"><h1 className="text-3xl font-bold">Login</h1></div>;
const Dashboard = () => <div className="pt-20 p-8"><h1 className="text-3xl font-bold">Dashboard</h1></div>;
const Products = () => <div className="pt-20 p-8"><h1 className="text-3xl font-bold">Products</h1></div>;
const Profile = () => <div className="pt-20 p-8"><h1 className="text-3xl font-bold">Profile</h1></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes (mocked for now) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
