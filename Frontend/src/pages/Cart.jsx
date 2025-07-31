import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
 
const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({ _id: productId, size, quantity });
        }
      }
    }

    // DEBUG: Remove this after confirming working
    console.log("cartItems from context:", cartItems);
    console.log("products from context:", products);
    console.log("Built cartData:", tempData);

    setCartData(tempData);
  }, [cartItems, products]); // <-- Added products here!

  if (products.length === 0) return <p>Loading products...</p>;

  if (cartData.length === 0)
    return (
      <div className="pt-14 px-4 sm:px-8 md:px-16 font-outfit text-charcoal">
         <Title text1={"Y"} text2={"OUR"} />&nbsp;&nbsp;&nbsp;
         <Title text1={"C"} text2={"ART"} />
        <p className="text-center py-20 text-charcoal/70">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="pt-14 px-4 sm:px-8 md:px-16 font-outfit text-charcoal border-t border-sage">
      <div className="text-2xl mb-6">
        <Title text1={"Y"} text2={"OUR"} />&nbsp;&nbsp;&nbsp;
         <Title text1={"C"} text2={"ART"} />
      </div>

      {cartData.map((item) => {
        const productData = products.find((p) => p._id === item._id);
        if (!productData) return null;

        const imageUrl =
          productData.image && productData.image.length > 0
            ? productData.image[0]
            : "https://via.placeholder.com/150?text=No+Image";

        return (
          <div
            key={`${item._id}-${item.size}`}
            className="grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center border-t border-b border-sage py-4 text-charcoal"
          >
            <div className="flex items-start gap-6">
              <img
                src={imageUrl}
                alt={productData.name}
                className="w-16 sm:w-20 rounded-md shadow-sm"
              />
              <div>
                <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-semibold">
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border border-sage rounded text-sm bg-softwhite">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || val === "0") return;
                updateQuantity(item._id, item.size, Number(val));
              }}
              className="max-w-[3rem] sm:max-w-[5rem] px-2 py-1 border border-sage rounded text-center focus:outline-none focus:ring-2 focus:ring-forest"
            />

            <img
              onClick={() => updateQuantity(item._id, item.size, 0)}
              src={assets.bin_icon}
              alt="Remove item"
              className="w-5 sm:w-6 cursor-pointer hover:text-red-600 transition-colors"
              title="Remove item"
            />
          </div>
        );
      })}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-end mt-8">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-forest text-softwhite text-sm px-8 py-3 rounded hover:bg-mint hover:text-forest transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
