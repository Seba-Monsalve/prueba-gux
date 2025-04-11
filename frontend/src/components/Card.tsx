import toast from "react-hot-toast";
import { useAuthStore, useTaskStore } from "../store";
import { useNavigate } from "react-router";

export const Card = ({
  titulo,
  id,
  description,
  estado,
  user_id,
}: {
  titulo: string;
  id: string;
  description: string;
  estado: string;
  user_id: string;
}) => {
  const { toogleTask, deleteTask } = useTaskStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleToggleTask = () => {
    if (user?.id == user_id) {
      toogleTask(id);
      toast.success("Tarea actualizada correctamente");
      return;
    }
    toast.error("No tienes permisos para completar esta tarea");
  };

  const handleDelete = () => {
    deleteTask(id);
    toast.success("Tarea borrada correctamente");
  };

  return (
    <div className="flex flex-row justify-around items-between bg-amber-400 p-5 m-5 rounded-lg shadow-lg gap-4 w-full md:w-md">
      <div className="flex-1 flex-row justify-between items-center gap-5 ">
        <h1 className=" flex-1 text-4xl overflow-ellipsis line-clamp-1">
          {titulo}
        </h1>
        <h1 className="  flex-1 text-2xl">{description}</h1>
      </div>

      <div className="flex-col  flex  justify-between items-end gap-5 ">
        <button
          className={`${
            estado == "PENDIENTE" ? "bg-amber-300" : "bg-green-300"
          }  p-2  rounded-lg cursor-pointer `}
          onClick={() => handleToggleTask()}
        >
          {estado}
        </button>
        {user?.id == user_id ? (
          <div className="flex flex-row gap-5 items-center justify-end">
            <button
              className="p-2 bg-amber-300 rounded-lg cursor-pointer"
              onClick={() => {
                navigate(`tasks/update/${id}`);
              }}
            >
              <img src="/src/assets/edit.png " className="size-7" alt="" />
            </button>
            <button
              className="p-2 bg-red-300 rounded-lg cursor-pointer"
              onClick={handleDelete}
            >
              <img src="/src/assets/delete.png" className="size-7" alt="" />
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-5 items-center justify-end size-10"></div>
        )}
      </div>
    </div>
  );
};
