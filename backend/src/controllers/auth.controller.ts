import { Request, Response } from "express";
import prisma from "../../prisma-client";
import { hashPassword, verifyPassword } from "../utils/bcrypt.util";
import { generateToken, verifyToken } from "../utils";

export class AuthController {
  static SignUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password)
        throw new Error("All fields are required");
      const emailExists = await prisma.usuario.findUnique({ where: { email } });
      if (!!emailExists) throw new Error("User already exists -1");

      const usernameExists = await prisma.usuario.findUnique({
        where: { email },
      });
      if (!!usernameExists) throw new Error("User already exists-2");

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.usuario.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      if (newUser) {
        const token = generateToken(newUser.id);
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      return res.status(200).json({
        user: newUser,
        message: "User created successfully",
        error: null,
        ok: true,
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        ok: false,
      });
    }
  };

  static LogIn = async (req, res) => {
    const { email, password } = req.body;
    console.log('fla2');

    try {
      if (!email || !password) throw new Error("All fields are required");
      console.log('fla2');

      const userExists = await prisma.usuario.findUnique({ where: {email} });
      if (!userExists)
        return res.status(401).json({
          message: "User or password incorrect. Try Again (error:1)",
          ok: false,
        });

        console.log('flag1');

      const isPasswordValid = await verifyPassword(
        password,
        userExists!.password!
      );
      if (!isPasswordValid)
        return res.status(401).json({
          message: "User or password incorrect. Try Again (error:2)",
          ok: false,
        });

      const token = generateToken(userExists!.id);
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      console.log(userExists);
      const { password: pass, ...rest } = userExists;
      return res.status(200).json({
        user: rest,
        ok: true,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Something went wrong",
        ok: false,
      });
    }
  };

  static GetUser = async (req, res) => {
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
      const user = await prisma.usuario.findUnique({
        where: { id: decodedToken.id },
      });
      if (!user) {
        return res.status(401).json({ message: "User not found", ok: false });
      }

      return res.status(200).json({ user, ok: true });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong", ok: false });
    }
  };

  static LogOut = async (req, res) => {
    res.clearCookie("access_token");
    return res
      .status(200)
      .json({ message: "Logged out successfully", ok: true });
  };
}
