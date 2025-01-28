import { LoginButton } from "./LoginButton";
import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router";
import { InputPasswordStyle } from "./InputPasswordStyle";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useAuth();
  const navigate = useNavigate();


  //Verificamos si hay una sesión activa
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/home");
    }
  }, [navigate]);

  //Llamamos al servicio de autenticación
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      await userLogin(data.user, data.token);

      alert("Inicio de sesión exitoso.");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <label
        htmlFor="website-admin"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Email
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md d">
          <svg
            className="w-6 h-6 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          id="email"
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
          placeholder="email@smartp.com"
        />
      </div>

      <label
        htmlFor="website-admin"
        className="block mb-2 pt-2 text-sm font-medium text-gray-900 "
      >
        Password
      </label>
      <div className="flex">
        <InputPasswordStyle />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          id="password"
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
          placeholder="**********"
        />
      </div>

      <div className="flex justify-center">
        <LoginButton />
      </div>
    </form>
  );
};
