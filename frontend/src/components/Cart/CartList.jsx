import { useEffect, useState } from "react";
import {
  getUserCart,
  removeFromCart,
  updateCartItem,
} from "../../services/cartService";
import { CartItem } from "./CartItem";
import {
  generateInvoice,
  downloadInvoice,
} from "../../services/invoiceService";
import { useNavigate } from "react-router";
export const CartList = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Comienza la carga
        const usercart = await getUserCart();
        // Llama al servicio
        setCart(usercart); // Actualiza el estado con los datos del carrito
      } catch (err) {
        // Guarda el mensaje de error
        console.error(err); // Muestra el error en la consola
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId); // Llama al servicio de eliminación
      setCart(cart.filter((item) => item.id !== itemId)); // Actualiza el estado
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el ítem del carrito"); // Muestra un mensaje de error
    }
  };

  const handleInvoice = async () => {
    const invoice = await generateInvoice();
    downloadInvoice(invoice.invoice.id);
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateCartItem(productId, quantity);
      // Actualiza la cantidad en el estado local
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, pivot: { ...item.pivot, quantity } }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la cantidad del producto");
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none h-full flex max-w-full ">
            <div className="pointer-events-auto w-screen max-w-2xl mx-auto">
              <div className="flex h-full flex-col  mx-auto bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.map((i) => (
                          <li className="flex py-6" key={i.id}>
                            <CartItem
                              data={i}
                              onRemove={handleRemove}
                              onQuantityChange={handleQuantityChange}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      $
                      {cart
                        .reduce(
                          (sum, item) => sum + item.price * item.pivot.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Valor total a pagar.
                  </p>
                  <div className="mt-6 mx-auto">
                    <button
                      onClick={() => {
                        handleInvoice();
                      }}
                      className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Factura
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        onClick={()=>{navigate('/home')}}
                        type="button"
                        className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                      >
                        Continuar comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
