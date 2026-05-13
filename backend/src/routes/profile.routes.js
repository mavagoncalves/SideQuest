import express from "express";
import {
  createUserProfile,
  fetchProfileById,
  fetchProfileByUserId,
  listProfiles,
  updateUserProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", listProfiles);
router.get("/user/:userId", fetchProfileByUserId);
router.get("/:id", fetchProfileById);
router.post("/", createUserProfile);
router.put("/:id", updateUserProfile);

export default router;
