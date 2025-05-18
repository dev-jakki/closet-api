import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
const prisma = new PrismaClient();

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email já registrado!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.json({ id_user: user.id_user, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({
      message: "Opss! Ocorreu um erro ao registrar usuário...",
      error: err,
    });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado!" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Senha incorreta!" });

    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id_user: user.id_user,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Opss! Ocorreu um erro ao fazer login...",
      error: err,
    });
  }
};
