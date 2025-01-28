import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../../services/productService";

export const useProductTable = () => {
    const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Valores iniciales del formulario
  const initialValues = {
    name: "",
    price: "",
    description: "",
    stock: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    // Cargar productos
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    if (isEditing) {
      // Actualizar producto existente
      const updatedProduct = await updateProduct({
        ...currentProduct,
        ...data,
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.product.id ? updatedProduct.product : p
        )
      );
      setIsEditing(false);
      setCurrentProduct(null);
      window.alert(updatedProduct.message);
    } else {
      // Crear un nuevo producto
      const newProduct = await createProduct(data);
      setProducts((prevProducts) => [...prevProducts, newProduct.product]);
      window.alert(newProduct.message);
    }
    reset(initialValues); // Limpiar los campos del formulario
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    reset({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    }); // Establecer los valores del producto actual
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    reset(initialValues); // Limpiar el formulario al cancelar
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
    window.alert(response.message);
  };

  return {
    products,
    isEditing,
    currentProduct,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleCancelEdit
    

  }

}
