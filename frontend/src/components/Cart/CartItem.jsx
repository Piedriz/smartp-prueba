import PropTypes from "prop-types";
import { useState } from "react";

export const CartItem = ({ data, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(data.pivot.quantity);

  const handleChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Solo valores positivos
    setQuantity(value);
    onQuantityChange(data.id, value); // Llama a la función de actualización
  };

  return (
    <div className="w-full">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="size-full object-cover"
        />
      </div>

      <div className="mt-2 ml-1 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
          
            <p>${data.price * data.pivot.quantity}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{data.description}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleChange}
            className="w-16 border rounded px-2 py-1 text-center"
          />

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(data.id)}
              className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
CartItem.propTypes = {
  data: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};
