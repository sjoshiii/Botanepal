import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShopContextProvider from "./context/ShopContext"; // import your context provider

export default function App() {
  return (
    <ShopContextProvider>
      <div className="bg-beige px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* Toast notifications */}
        <ToastContainer />

        {/* Navigation bar */}
        <Navbar />

        {/* Search bar */}
        <SearchBar />

        {/* Main content area with max width and centered */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ShopContextProvider>
  );
}
