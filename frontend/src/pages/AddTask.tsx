import React, { useState } from "react";
import { useTaskStore } from "../store/task.store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const AddTask = () => {
  const { isLoading, error, addTask } = useTaskStore();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    titulo: "",
    descripcion: "",
  });

  function handlesubmit(event: any): void {
    event.preventDefault();
    const { titulo, descripcion } = formData;
    addTask({ titulo, descripcion });

    if (error) toast.error(error);

    toast.success("Tarea creada con exito");
    navigate("/");
  }

  function handleOnChange(event: any): void {
    event.preventDefault();
    setformData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <div className="flex flex-col justify-center items-center p-5 ">
      <h1 className="text-4xl font-semibold">Agregar Tarea</h1>
      <form
        onSubmit={handlesubmit}
        className=" flex flex-col justify-center items-center gap-5 mt-5 px-5 py-3 rounded-lg shadow-lg w-full max-w-md"
      >
        <label htmlFor="titulo" className="w-100 flex flex-col gap-2" />
        <h2 className="text-2xl w-100 font-semibold ">Titulo</h2>
        <input
          onChange={handleOnChange}
          value={formData.titulo}
          type="text"
          id="titulo"
          className=" mt-2  p-3 bg-gray-100 rounded-lg w-100 flex"
        />
        <label htmlFor="descripcion">
          <h2 className="text-2xl w-full font-semibold ">Descripcion</h2>
          <textarea
            rows={5}
            onChange={handleOnChange}
            value={formData.descripcion}
            id="descripcion"
            className=" mt-2  p-3 bg-gray-100 rounded-lg resize-none w-100 flex "
          />
        </label>
        <button
          className="text-2xl p-5 bg-amber-400  rounded-lg cursor-pointer hover:opacity-80"
          type="submit"
        >
          {isLoading ? "Loading..." : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
};
