import React, { useContext } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <p className="text-center py-10">Loading latest collection...</p>;
  }

  // Get first 10 products as latest (adjust sorting if needed)
  const latestProducts = products.slice(0, 10);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title text1="L" text2="ATEST" />&nbsp;&nbsp;&nbsp;
<Title text1="L" text2="EAVES" />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-charcoal/70 font-outfit">
          Discover our freshest greenery – handpicked houseplants and garden
          favorites to breathe new life into your space. Curated with care,
          delivered with love.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
