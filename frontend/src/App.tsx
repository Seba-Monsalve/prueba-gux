import { Card, PrivateRoutes } from "./components";
import { Route, Routes } from "react-router";

import NavBar from "./components/NavBar";
import {
  AddTask,
  Home,
  Login,
  NotFound,
  SignUp,
  TaskPage,
  UpdateTask,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/tasks/add"} element={<AddTask />} />
          <Route path={"/tasks/update/:id"} element={<UpdateTask />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
