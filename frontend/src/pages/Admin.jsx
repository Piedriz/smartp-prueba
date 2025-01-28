import { UserTable } from "../components/Admin/UserTable";
import { ProductTable } from "../components/Admin/ProductTable";

export const Admin = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Página de Administración</h1>

      <section className="mb-12">
        <UserTable />
      </section>

      <section>
        <ProductTable />
      </section>
    </div>
  );
};
