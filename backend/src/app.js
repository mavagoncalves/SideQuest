import cors from "cors";
import express from "express";
import morgan from "morgan";
import { prisma } from "../prisma/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import marketplaceRoutes from './routes/marketplace.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "sidequest-api" });
});

app.use("/profiles", profileRoutes);
app.use("/auth", authRoutes);

app.get("/users", async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        skills: {
          include: { skill: true }
        }
      }
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const {
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      bio,
      location,
      hourlyRateCents,
      avatarUrl
    } = req.body;

    if (!email || !passwordHash || !firstName || !lastName) {
      res.status(400).json({
        error: "email, passwordHash, firstName, and lastName are required"
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        bio,
        location,
        hourlyRateCents,
        avatarUrl
      }
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

export { app };
