import { useState } from "react";
import { useAuthStore } from "../store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const { isLoading, error, signUp } = useAuthStore();

  const navigate = useNavigate();

  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        toast.error("contraseñas no coinciden");
        return;
      }
      const { username, email, password } = formData;

       signUp(username, email, password);

      if (!!error) toast.error(error);
      toast.success("Usuario creado correctamente");
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex flex-col justify-center h-full  items-center">
      <h1 className="text-3xl font-bold text-center mt-10">Registrarse</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-center items-center gap-5 mt-10 w-full max-w-md shadow-lg p-5 bg-white"
      >
        <label htmlFor="username">
          <h2 className="text-2xl">Nombre de usuario</h2>
          <input
            onChange={handleChange}
            type="username"
            id="username"
            className=" mt-2  p-3 bg-gray-100 rounded-lg shadow-md"
          />
        </label>
        <label htmlFor="email">
          <h2 className="text-2xl">Email</h2>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            className=" mt-2  p-3 bg-gray-100 rounded-lg shadow-md"
          />
        </label>
        <label htmlFor="password">
          <h2 className="text-2xl">Contraseña</h2>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            className=" mt-2  p-3 bg-gray-100 rounded-lg shadow-md"
          />
        </label>
        <label htmlFor="password2">
          <h2 className="text-2xl ">Confirmar Contraseña</h2>
          <input
            onChange={handleChange}
            id="password2"
            type="password"
            className=" mt-2  p-3 bg-gray-100 rounded-lg shadow-md "
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="text-2xl p-2 bg-amber-400 px-3 rounded-lg cursor-pointer hover:opacity-80"
        >
          {isLoading ? "Loading..." : "Registrarse"}
        </button>
      </form>

      <div className="flex flex-row justify-center items-center mt-5 gap-2">
        <p className="text-2xl">Ya tienes cuenta?</p>
        <a href="/login" className=" text-2xl text-amber-500">
          Ingresa
        </a>
      </div>
    </div>
  );
};
