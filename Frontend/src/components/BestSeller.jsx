import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]); // added products dependency

  if (!bestSeller.length) {
    return <p className="text-center py-10">Loading best sellers...</p>; 
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8 ">
        <Title text1={"M"} text2={"OST"} />&nbsp;&nbsp;&nbsp;
        <Title text1={"L"} text2={"OVED"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-charcoal/70 font-outfit">
          Discover our most-loved plants, handpicked for their beauty,
          resilience, and customer favorites. Perfect for any space, indoors or
          out.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
