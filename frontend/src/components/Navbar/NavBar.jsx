import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { getUserCart } from "../../services/cartService";

export const NavBar = () => {
  const navigate = useNavigate();
  const { cart, setCart, user } = useAuth();
  const { userLogout } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const usercart = await getUserCart();
        setCart(usercart);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [setCart]);

  const handleLogout = () => {
    userLogout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>

                {user?.role == "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700"
                      aria-current="page"
                    >
                      Admin
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  href="#"
                  className="cursor-pointer rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700"
                  aria-current="page"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 ">
              <div>
                <Link
                  to={"/cart"}
                  type="button"
                  className="cursor-pointer relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <svg
                    className="w-8 h-8 text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500  rounded-full -top-2 -end-2 ">
                      {cart.length}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            to="/home"
            className="block rounded-md bg-blue-100 px-3 py-2 text-base font-medium text-blue-700"
            aria-current="page"
          >
            Home
          </Link>
          {user?.role == "admin" && (
            <Link
              to="/admin"
              className="block rounded-md bg-green-100 px-3 py-2 text-base font-medium text-green-700"
              aria-current="page"
            >
              Admin
            </Link>
          )}

          <button
            onClick={() => {
              handleLogout();
            }}

            className="block rounded-md w-full bg-red-100 px-3 py-2 text-left font-medium text-red-700"
            aria-current="page"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
