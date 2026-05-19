import { prisma } from "../../prisma/prisma.js";

export const createReview = async (reviewerId, revieweeId, data) => {
  return prisma.review.create({
    data: {
      reviewerId,
      revieweeId,
      rating: data.rating,
      comment: data.comment,
    },
    // Return the reviewer's info so the frontend can display their name/avatar
    include: {
      reviewer: {
        select: { firstName: true, lastName: true, avatarUrl: true }
      }
    }
  });
};

export const getReviewsForUser = async (userId) => {
  return prisma.review.findMany({
    where: { revieweeId: userId },
    include: {
      reviewer: {
        select: { firstName: true, lastName: true, avatarUrl: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};