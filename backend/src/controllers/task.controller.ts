import { Request, Response } from "express";
import prisma from "../../prisma-client";
import { hashPassword, verifyPassword } from "../utils/bcrypt.util";
import { generateToken, verifyToken } from "../utils";

export class TaskController {
  static getTasks = async (req, res) => {
    console.log("get tasks");
    const token = req.cookies.access_token;
    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }
      const tasks = await prisma.tarea.findMany({
        where: { user_id: decodedToken.payload },
      });

      return res.status(200).json({ tasks, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };

  static addTask = async (req, res) => {
    console.log("add task");
    const token = req.cookies.access_token;
    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      console.log({ data: req.body });
      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.payload },
      });
      if (!user)
        return res.status(401).json({ message: "user doesn exist", ok: false });

      const newTask = await prisma.tarea.create({
        data: {
          ...req.body,
          user_id: decodedToken.payload,
        },
      });
      console.log(newTask);

      return res.status(200).json({ task: newTask, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };
  static toogleTask = async (req, res) => {
    const token = req.cookies.access_token;
    const { id } = req.params;

    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.payload },
      });
      if (!user)
        return res.status(401).json({ message: "user doesn exist", ok: false });

      const task = await prisma.tarea.findUnique({
        where: { id },
      });
      const toogledTask = await prisma.tarea.update({
        where: { id },
        data: {
          estado: task?.estado == "PENDIENTE" ? "COMPLETADO" : "PENDIENTE",
        },
      });
      return res.status(200).json({ task: toogledTask, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };
  static deleteTask = async (req, res) => {
    const token = req.cookies.access_token;
    const { id } = req.params;

    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.payload },
      });
      if (!user)
        return res.status(401).json({ message: "user doesn exist", ok: false });

      const task = await prisma.tarea.findUnique({
        where: { id },
      });

      if (!user)
        return res.status(401).json({ message: "task doesn exist", ok: false });

      const deleteddTask = await prisma.tarea.delete({
        where: { id },
      });

      return res.status(200).json({ task: deleteddTask, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };

  static getTaskById = async (req, res) => {
    const token = req.cookies.access_token;
    const { id } = req.params;

    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.payload },
      });
      if (!user)
        return res.status(401).json({ message: "user doesn exist", ok: false });

      const task = await prisma.tarea.findUnique({
        where: { id },
      });

      if (!user)
        return res.status(401).json({ message: "task doesn exist", ok: false });

      return res.status(200).json({ task, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };

  static updateTask = async (req, res) => {
    console.log("update task");
    const token = req.cookies.access_token;
    const { id } = req.params;

    const { titulo, descripcion, estado } = req.body;

    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token not provided", ok: false });
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.payload },
      });
      if (!user)
        return res.status(401).json({ message: "user doesn exist", ok: false });

      const task = await prisma.tarea.findUnique({
        where: { id },
      });
      if (!task)
        return res.status(401).json({ message: "task doesn exist", ok: false });

      const updatedTask = await prisma.tarea.update({
        where: { id },
        data: {
          estado,
          titulo,
          descripcion,
        },
      });
      return res.status(200).json({ task: updatedTask, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };
}
