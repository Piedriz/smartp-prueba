import axiosInstance from "../api/axiosConfig";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`/products`);
    return response.data;
  } catch (error) {
    window.alert(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error al obtener el carrito"
    );
  }
};

export const createProduct = async ({ name, description, price, stock }) => {
  try {
    const response = await axiosInstance.post(`/products`, {
      name,
      description,
      price,
      stock,
    });

    return response.data;
  } catch (error) {
    window.alert("Error al crear producto, verifique los valores");
    throw (
      error.response?.data || {
        message: "Error al crear producto. Intenta de nuevo.",
      }
    );
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await axiosInstance.put(`/products/${data.id}`, data);
    return response.data;
  } catch (error) {
    window.alert(error.response.data.message);
    throw new Error(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    window.alert(error.response.data.message);
    throw new Error(error);
  }
};
