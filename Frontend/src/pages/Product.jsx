import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);  // get addToCart here from context
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      setProductData(product || null); 
    }
  }, [productId, products]);

  if (!productData) return <div>Loading product details...</div>;

  return (
    <div className="border-t-2 border-sage pt-10 font-outfit text-charcoal">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full sm:w-[80%] ml-auto">
            <img
              src={productData.image?.[0]}
              alt={productData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = assets.default_plant_image;
              }}
              className="w-[300px] h-[400px] object-contain rounded-md shadow-md"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-xl font-semibold">
            {productData.price} {currency}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold">Select Pot Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border border-sage rounded-md py-2 px-4 transition-colors ${
                    item === size
                      ? "bg-forest text-softwhite"
                      : "bg-transparent text-charcoal hover:bg-mint hover:text-forest"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // if (!size) {
              //   toast.error("Please select a size");
              //   return;
              // }
              addToCart(productData._id, size);  // Use context addToCart here
              // toast.success("Added to cart!");
            }}
            disabled={!size}
            className={`px-8 py-3 text-sm rounded transition duration-100 ease-in-out ${
              size
                ? "bg-forest text-softwhite hover:bg-mint hover:text-forest hover:border hover:border-forest active:scale-95 focus:ring-2 focus:ring-mint"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
