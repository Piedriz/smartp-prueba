import { useUserTable } from "./hooks/useUserTable";

export const UserTable = () => {

  const userTable = useUserTable()
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>

      {/* Formulario para crear o editar usuario */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {userTable.isEditing ? "Editar Usuario" : "Crear Usuario"}
        </h3>
        <form onSubmit={userTable.handleSubmit(userTable.onSubmit)}>
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
              {...userTable.register("name", { required: "El nombre es obligatorio" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {userTable.errors.name && (
              <p className="text-red-500 text-sm mt-1">{userTable.errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...userTable.register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "El correo no es válido",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {userTable.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {userTable.errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              {...userTable.register("role", { required: "El rol es obligatorio" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione un rol
              </option>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
            {userTable.errors.role && (
              <p className="text-red-500 text-sm mt-1">{userTable.errors.role.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...userTable.register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {userTable.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {userTable.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            {userTable.isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={userTable.handleCancelEdit}
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
                Crear Usuario
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Rol</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userTable.users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => userTable.handleEditUser(user)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => userTable.handleDeleteUser(user.id)}
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
