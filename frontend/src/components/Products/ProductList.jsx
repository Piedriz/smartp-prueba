import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router";
export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    fetchProducts();
  }, [navigate]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Productos en venta
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((i) => (
            <ProductCard key={i.id} data={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
