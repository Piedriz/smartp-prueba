import PropTypes from "prop-types";
import { ProductRate } from "./ProductRate";
import { addToCart } from "../../services/cartService";
import { useAuth } from "../../hooks/useAuth";

export const ProductCard = ({ data }) => {
  const { cart, setCart } = useAuth();

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id, 1);
      const itemExists = cart.some((item) => item.id === id);
      if (!itemExists) {
        setCart([...cart, data]); // Llama al servicio de eliminación// Actualiza el estado
        return; // Sal de la función si ya existe
      }
    } catch (err) {
      console.error(err);
      alert("Error al agregar al carrito"); // Muestra un mensaje de error
    }
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
      <a href="#">
        <img
          className=" rounded-t-lg"
          src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
            {data.name}
          </h5>
        </a>

        <ProductRate />

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">
            ${data.price}
          </span>
          <button
            onClick={() => {
              handleAddToCart(data.id);
            }}
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  data: PropTypes.object.isRequired, // 'children' debe ser un nodo React y es obligatorio
};
