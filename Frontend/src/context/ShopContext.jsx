import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$ ";
  const delivery_fee = 10;

  const [products, setProducts] = useState([]); // products loaded from API
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  // Fetch products from API on component mount
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products.");
      });
  }, []);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId] || !cartData[itemId][size]) return;

    cartData[itemId][size] -= 1;

    if (cartData[itemId][size] <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue; // skip if product not loaded yet
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const placeOrder = () => {
    const orderItems = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          orderItems.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
            date: new Date().toLocaleDateString("en-GB"),
          });
        }
      }
    }
    if (orderItems.length > 0) {
      setOrders((prev) => [...prev, ...orderItems]);
      setCartItems({});
      toast.success("Order placed successfully!");
      navigate("/orders");
    } else {
      toast.error("Your cart is empty.");
    }
  };

  // This function returns total quantity of product (all sizes summed)
  const getProductQuantity = (id) => {
    if (!cartItems[id]) return 0;
    return Object.values(cartItems[id]).reduce((acc, val) => acc + val, 0);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    orders,
    placeOrder,
    getProductQuantity,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
