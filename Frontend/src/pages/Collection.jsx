import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  }, [products, category, subCategory, search, showSearch, sortType]);

  if (!products || products.length === 0) {
    return <p className="p-10 text-center">Loading products...</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t border-sage font-outfit text-charcoal">
      {/* Filter Panel */}
      <div className="min-w-[15rem]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 select-none"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="dropdown icon"
          />
        </p>

        {/* Category */}
        <div
          className={`border border-sage pl-5 py-3 mt-6 rounded-md bg-softwhite ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-forest">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-charcoal">
            {["Indoor Plants", "Outdoor Plants", "Succulents & Cacti"].map(
              (cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    className="w-4 h-4 accent-forest"
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  {cat}
                </label>
              )
            )}
          </div>
        </div>

        {/* SubCategory */}
        <div
          className={`border border-sage pl-5 py-3 my-5 rounded-md bg-softwhite ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-forest">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-charcoal">
            {["Flowering", "Foliage", "Herbs & Edibles"].map((subCat) => (
              <label key={subCat} className="flex items-center gap-2 cursor-pointer">
                <input
                  className="w-4 h-4 accent-forest"
                  type="checkbox"
                  value={subCat}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(subCat)}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
           <div className="text-xl sm:text-2xl my-3">
          <Title text1={"G"} text2={"ARDEN"} />&nbsp;&nbsp;&nbsp;
          <Title text1={"T"} text2={"REASURES"} />
        </div>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-sage text-sm px-2 rounded-md text-charcoal"
            value={sortType}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filterProducts.length === 0 ? (
          <p className="p-10 text-center">No products found matching the criteria.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image?.[0]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
