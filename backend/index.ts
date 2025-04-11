import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes, taskRoutes } from "./src/routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(PORT, async () => {
  console.log(`Running on port ${PORT} `);
});
