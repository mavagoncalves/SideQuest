import { createReview, getReviewsForUser } from "../models/review.model.js";

export const addReview = async (req, res, next) => {
  try {
    const { reviewerId, revieweeId, rating, comment } = req.body;

    // Validation
    if (!reviewerId || !revieweeId || !rating) {
      return res.status(400).json({ error: "reviewerId, revieweeId, and rating are required" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be a whole number between 1 and 5" });
    }

    if (reviewerId === revieweeId) {
      return res.status(400).json({ error: "You cannot review yourself" });
    }

    // Database Creation
    const review = await createReview(reviewerId, revieweeId, { rating, comment });
    
    // Success Response
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const fetchUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reviews = await getReviewsForUser(userId);
    
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};