'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data.products); // Set the products state with the response data
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
          <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto transition-transform transform hover:scale-105">
            <div className="px-4 py-2">
              <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{product.name}</h1>
            </div>
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">${product.price}</h1>
              <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
