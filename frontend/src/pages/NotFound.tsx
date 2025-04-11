export const NotFound = () => {
  return (
    <div className="w-full  flex flex-col text-center justify-center mt-20 gap-5">
      <h1 className="text-9xl font-semibold">404</h1>
      <h1 className="text-4xl font-semibold">Pagina no encontrada</h1>
      <button className="mt-5">
        <a className="mt-5 p-3 cursor-pointer text-2xl font-medium hover:bg-amber-300  transition-all rounded-lg" href="/login">
          Volver al login
        </a>
      </button>
    </div>
  );
};
