import axiosInstance from "../api/axiosConfig";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data; 
  } catch (error) {
    window.alert(error.response?.data?.message || "Error al obtener los usuarios");
    throw new Error(
      error.response?.data?.message || "Error al obtener los usuarios"
    );
  }
};

export const createUser = async ({ name, email, role,password }) => {
  try {
    const response = await axiosInstance.post(`/users`, {
      name,
      email,
      role,
      password,
    });
    return response.data; 
  } catch (error) {
    window.alert("Error al crear usuario, verifica los valores");
    throw (
      error.response?.data || {
        message: "Error al crear usuario. Intenta de nuevo.",
      }
    );
  }
};

export const updateUser = async (data) => {
    
  try {
    const response = await axiosInstance.put(`/users/${data.id}`, data);
    return response.data; 
  } catch (error) {
    window.alert(error.response?.data?.message || "Error al actualizar usuario");
    throw new Error(error.response?.data || "Error al actualizar usuario");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data; 
  } catch (error) {
    window.alert(error.response?.data?.message || "Error al eliminar usuario");
    throw new Error(error.response?.data || "Error al eliminar usuario");
  }
};
