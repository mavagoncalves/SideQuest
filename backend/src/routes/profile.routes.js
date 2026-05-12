const express = require("express");
const {
  createUserProfile,
  fetchProfileById,
  fetchProfileByUserId,
  listProfiles,
  updateUserProfile
} = require("../controllers/profile.controller");

const router = express.Router();

router.get("/", listProfiles);
router.get("/user/:userId", fetchProfileByUserId);
router.get("/:id", fetchProfileById);
router.post("/", createUserProfile);
router.put("/:id", updateUserProfile);

module.exports = router;
