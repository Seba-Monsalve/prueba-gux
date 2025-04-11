import { useEffect } from "react";
import { Card } from "../components";
import { useAuthStore, useTaskStore } from "../store";

export const Home = () => {
  const { tasks, isLoading, getTasks } = useTaskStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getTasks();
  }, []);

  if (!user)
    return (
      <div className="text-2xl text-center mt-10">
        Debes estar haber iniciado sesion para ver las tareas
      </div>
    );

  if (isLoading)
    return <div className="text-2xl text-center mt-10">Cargando...</div>;

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      <h1 className="text-4xl">Tareas registradas</h1>
      <div className=" flex flex-row justify-center items-center flex-wrap gap-5 p-">
        {!!tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              titulo={task.titulo}
              description={task.descripcion}
              estado={task.estado}
              user_id={task.user_id}
            />
          ))
        ) : (
          <h1 className="text-2xl mt-10">No hay tareas registradas </h1>
        )}
      </div>
    </div>
  );
};
