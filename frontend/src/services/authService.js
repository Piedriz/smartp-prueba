import axiosInstance from "../api/axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/login`, { email, password });
    return response.data; 
  } catch (error) {
    console.error(
      "Error al iniciar sesión:",
      error.response?.data || error.message
    );
    throw (
      error.response?.data || {
        message: "Error al iniciar sesión. Intenta de nuevo.",
      }
    );
  }
};
