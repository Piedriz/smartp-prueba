import axiosInstance from "../api/axiosConfig";

export const getUserCart = async () => {
  try {
    const response = await axiosInstance.get(`/cart`);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el carrito"
    );
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axiosInstance.post(`/cart`, {
      product_id: productId,
      quantity,
    });
    return response.data; 
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error.response?.data || "Error al agregar producto al carrito";
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await axiosInstance.put(`/cart/${productId}`, {
      quantity,
    });
    return response.data; 
  } catch (error) {
    console.error("Error al actualizar producto al carrito:", error);
    throw error.response?.data || "Error al agregar producto al carrito";
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    throw error.response?.data || "Error al eliminar producto del carrito";
  }
};
