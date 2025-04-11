import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";

export const PrivateRoutes = () => {
  const { user } = useAuthStore();
  
  if (!user) toast.error("Debe iniciar sesion para acceder a esta pagina");
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};
