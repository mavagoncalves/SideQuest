import express from "express";
import { addReview, fetchUserReviews } from "../controllers/review.controller.js";

const router = express.Router();

// Create a new review
router.post("/", addReview);

// Get all reviews for a specific user
router.get("/user/:userId", fetchUserReviews);

export default router;