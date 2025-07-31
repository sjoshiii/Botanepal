import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';  

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p>{product.category}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
