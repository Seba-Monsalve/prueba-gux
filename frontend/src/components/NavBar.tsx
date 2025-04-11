import { useNavigate } from "react-router";
import { useAuthStore } from "../store";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  async function handleLogOut(event: any) {
    event.preventDefault();
    await logout();
    toast.success("Cierre de sesion exitoso");
    navigate("/login");
  }

  return (
    <div className="flex p-5 flex-row justify-between items-center bg-amber-400">
      <div className="flex flex-row gap-10 items-center">
        <a href="/">
          <h1 className="text-3xl"> Tareas</h1>
        </a>
        {user && (
          <div className="flex flex-row gap-5">
            <a
              href="/tasks/add"
              className="text-2xl p-2 rounded-lg  font-medium  transition-all hover:bg-amber-500 hover:text-white"
            >
              Agregar Tarea
            </a>
          </div>
        )}
      </div>

      {user == null ? (
        <div className="flex flex-row gap-5">
          <button className="  hover:border-amber-600 ">
            <a href="/login" className="text-2xl p-2 rounded-lg font-semibold">
              Login
            </a>
          </button>
          <a
            href="/signup"
            className="text-2xl bg-amber-500 p-3 text-white font-semibold  rounded-lg"
          >
            SignUp
          </a>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-5">
          <h2 className="text-3xl">Bienvenido, {user.username}</h2>
          <button
            className="text-2xl bg-red-500 text-white p-2 rounded-lg cursor-pointer"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
