import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router";

export const Login = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  async function handlesubmit(e: any): Promise<void> {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Completar todos los campos");
      return;
    }
    await login(email, password);
    if (error) {
      toast.error(error);
      return;
    }
      toast.success("Login success");
      navigate("/");
    }

  function handleOnChange(event: any): void {
    setformData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <div className="flex flex-col justify-center h-full items-center">
      <h1 className="text-3xl font-bold text-center mt-10">Login</h1>

      <form
        onSubmit={handlesubmit}
        className=" flex flex-col justify-center items-center gap-5 mt-10  rounded-lg shadow-lg p-5 bg-white"
      >
        <label htmlFor="email">
          <h2 className="text-2xl">Email</h2>
          <input
            onChange={handleOnChange}
            value={formData.email}
            type="email"
            id="email"
            className=" mt-2  p-3 bg-gray-100 rounded-lg"
          />
        </label>
        <label htmlFor="password">
          <h2 className="text-2xl">Password</h2>
          <input
            onChange={handleOnChange}
            value={formData.password}
            id="password"
            type="password"
            className=" mt-2  p-3 bg-gray-100 rounded-lg"
          />
        </label>
        <button
          className="text-2xl p-2 bg-amber-400 rounded-lg cursor-pointer hover:opacity-80"
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>

      <div className="flex flex-row justify-center items-center mt-10 gap-2">
        <p className="text-2xl">No tienes cuenta?</p>
        <a href="/signup" className=" text-2xl text-amber-500">
          Registrate
        </a>
      </div>
    </div>
  );
};
