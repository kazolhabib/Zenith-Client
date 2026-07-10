import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ListingDetails from './pages/ListingDetails';
import { Explore } from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './pages/AddListing';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import ManageListings from './pages/ManageListings';
import About from './pages/About';
import Contact from './pages/Contact';

// Placeholder Pages
const Products = () => <div className="pt-20 p-8 text-white"><h1 className="text-3xl font-bold">Products</h1></div>;
const Profile = () => <div className="pt-20 p-8 text-white"><h1 className="text-3xl font-bold">Profile</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#09090b]">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              
              {/* Protected Routes */}
              <Route 
                path="/items/add" 
                element={
                  <ProtectedRoute>
                    <AddListing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/items/manage" 
                element={
                  <ProtectedRoute>
                    <ManageListings />
                  </ProtectedRoute>
                } 
              />
              <Route path="/products" element={<Products />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
