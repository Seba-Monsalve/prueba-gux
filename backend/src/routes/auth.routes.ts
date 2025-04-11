import { Router } from "express";
import { AuthController } from "../controllers";

export const authRoutes = Router();
authRoutes.post("/signup", AuthController.SignUp);
authRoutes.post("/login", AuthController.LogIn);
authRoutes.post("/logout", AuthController.LogOut);
