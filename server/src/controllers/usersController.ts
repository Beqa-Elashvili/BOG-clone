import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name, phoneNumber, personalNumber } = req.body;

  if (!email || !password || !name || !phoneNumber || !personalNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }, { personalNumber }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User with this email, phone number, or personal number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        personalNumber,
      },
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      personalNumber: user.personalNumber,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      personalNumber: user.personalNumber,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Authorization: Bearer <token>'

  if (!token) {
    res.status(403).json({ error: "Access denied, no token provided" });
    return; // Ensure no further code is executed after sending the response
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: "Invalid or expired token" });
      return; // Ensure no further code is executed after sending the response
    }

    req.user = user;

    next();
  });
};
