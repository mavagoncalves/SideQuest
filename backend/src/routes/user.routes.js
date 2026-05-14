import express from "express";
import { updateUser } from "../controllers/user.controller.js";

const router = express.Router();

// PUT /users/:id
router.put("/:id", updateUser);

export default router;