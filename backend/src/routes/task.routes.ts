import { Router } from "express";
import {  TaskController } from "../controllers";

export const taskRoutes = Router();
taskRoutes.get("/", TaskController.getTasks);
taskRoutes.get("/:id", TaskController.getTaskById);
taskRoutes.post("/add", TaskController.addTask);
taskRoutes.post("/toggle/:id", TaskController.toogleTask);
taskRoutes.delete("/delete/:id", TaskController.deleteTask);
taskRoutes.post("/update/:id", TaskController.updateTask);
