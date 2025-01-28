import { useProductTable } from "./hooks/useProductTable";
export const ProductTable = () => {

  const productTable = useProductTable()

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Productos</h2>

      {/* Formulario */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {productTable.isEditing ? "Editar Producto" : "Crear Producto"}
        </h3>
        <form onSubmit={productTable.handleSubmit(productTable.onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...productTable.register("name", { required: "El nombre es obligatorio" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {productTable.errors.name && (
              <p className="text-red-500 text-sm">{productTable.errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              {...productTable.register("price", {
                required: "El precio es obligatorio",
                validate: (value) =>
                  value > 0 || "El precio debe ser un número positivo",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {productTable.errors.price && (
              <p className="text-red-500 text-sm">{productTable.errors.price.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              {...productTable.register("stock", {
                required: "El stock es obligatorio",
                validate: (value) =>
                  value > 0 || "El stock debe ser un número positivo",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {productTable.errors.stock && (
              <p className="text-red-500 text-sm">{productTable.errors.stock.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              {...productTable.register("description", {
                required: "La descripción es obligatoria",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {productTable.errors.description && (
              <p className="text-red-500 text-sm">{productTable.errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            {productTable.isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={productTable.handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Crear Producto
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Precio</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productTable.products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">{product.id}</td>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.description}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => productTable.handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => productTable.handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
