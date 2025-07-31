import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const backendUrl = "http://localhost:5000/";

  // Helper to check if URL is full
  const isFullUrl = (url) => /^https?:\/\//.test(url);

  // Handles image input-
  const getImageUrl = (img) => {
    if (!img) return "/images/placeholder.jpg";

    if (Array.isArray(img)) {
      const firstImg = img[0];
      if (!firstImg) return "/images/placeholder.jpg";
      return isFullUrl(firstImg) ? firstImg : backendUrl + firstImg;
    }

    return isFullUrl(img) ? img : backendUrl + img;
  };

  const imageUrl = getImageUrl(image);

  return (
    <div className="w-full border border-sage/30 rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <Link to={`/product/${id}`}>
        <img
          src={imageUrl}
          alt={`Image of ${name}`}
          className="w-full h-48 object-cover rounded-md"
        />
      </Link>

      <div className="flex flex-col justify-between mt-2">
        <p className="text-sm font-semibold text-forest line-clamp-2 min-h-[3rem]">
          {name}
        </p>
        <p className="text-sm font-medium text-charcoal">$ {price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
