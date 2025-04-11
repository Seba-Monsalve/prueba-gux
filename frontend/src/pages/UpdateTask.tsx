import { useEffect, useState } from "react";
import { useTaskStore } from "../store/task.store";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export const UpdateTask = () => {
  const { task, getTaskById, isLoading, error, updateTask } = useTaskStore();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    titulo: null,
    descripcion: null,
    estado: null,
  });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getTaskById(id as string);
  }, []);

  function handlesubmit(event: any): void {
    event.preventDefault();
    const { titulo, descripcion, estado } = formData;

    updateTask({
      titulo: titulo || task.titulo,
      descripcion: descripcion || task.descripcion,
      estado: estado || task.estado,
      id: id!,
    });
    if (error) toast.error(error);
    toast.success("Tarea actualizada con exito");
    navigate("/");
  }

  function handleOnChange(event: any): void {
    event.preventDefault();

    setformData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  if (task === null)
    return <div className="text-2xl text-center mt-10">Cargando...</div>;

  return (
    <div className="flex flex-col justify-center items-center p-5 ">
      <h1 className="text-4xl font-semibold">Actualizar Tarea</h1>
      <form
        onSubmit={handlesubmit}
        className=" flex flex-col justify-center items-center gap-5 mt-5  rounded-lg p-8 bg-gray-50 shadow-md"
      >
        <label htmlFor="titulo" className="w-100 flex flex-col gap-2" />
        <h2 className="text-2xl w-100 font-medium">Titulo</h2>
        <input
          onChange={handleOnChange}
          value={formData.titulo || task.titulo}
          type="text"
          id="titulo"
          className=" mt-2  p-3 bg-gray-100 rounded-lg w-100 flex "
        />
        <label htmlFor="descripcion">
          <h2 className="text-2xl w-full font-medium ">Descripcion</h2>
          <textarea
            rows={5}
            onChange={handleOnChange}
            value={formData.descripcion || task.descripcion}
            id="descripcion"
            className=" mt-2  p-3 bg-gray-100 rounded-lg resize-none w-100 flex "
          />
        </label>
        <label htmlFor="estado" className="flex flex-col gap-2 w-100">
          <h2 className="text-2xl w-full font-medium">Estado</h2>
          <select
            name="select"
            className="mt-2  p-3 bg-gray-100 rounded-lg resize-none w-100 flex "
            id="estado"
            onChange={handleOnChange}
            value={formData.estado || task.estado}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="COMPLETADO">Completado</option>
          </select>
        </label>
        <button
          className="text-2xl p-3 bg-amber-400  rounded-lg cursor-pointer hover:opacity-80"
          type="submit"
        >
          {isLoading ? "Loading..." : "Actualizar Tarea"}
        </button>
      </form>
      {/* 
      {JSON.stringify(task)}
      <br />
      {JSON.stringify(formData)} */}
    </div>
  );
};
