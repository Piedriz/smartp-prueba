import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Cambia esto por la URL de tu backend

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token en los encabezados de todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage (o cualquier otro lugar donde lo guardes)
    const token = localStorage.getItem("token"); // O usa otro lugar donde guardes el token

    if (token) {
      // Agregar el token al encabezado de autorización
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
