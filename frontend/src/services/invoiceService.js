import axiosInstance from "../api/axiosConfig";

export const generateInvoice = async () => {
  try {
    const response = await axiosInstance.post(`/generate-invoice`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el carrito"
    );
  }
};

export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await axiosInstance.get(`/invoice/${invoiceId}/pdf`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Genera una URL temporal para descargar el archivo
    const url = window.URL.createObjectURL(blob);

    // Crea un elemento <a> para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${invoiceId}.pdf`; // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();

    // Limpia recursos
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
    // Retorna los datos del carrito
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el carrito"
    );
  }
};
