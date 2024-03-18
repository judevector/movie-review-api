import mongoose from "mongoose";
import Review from "../models/review.model.js";

let reviews;
export default class ReviewsDAO {
  static async addReview(movieId, user, review) {
    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const reviewDoc = new Review({
        movieId: movieId,
        user: user,
        review: review,
      });

      // Save the review document
      const savedReview = await reviewDoc.save();

      // Return the saved review
      return { success: true, review: savedReview };
    } catch (error) {
      console.error(`Unable to post review: ${error.message}`);
      return { error: error.message };
    }
  }

  static async getReview(reviewId) {
    try {
      return await Review.findById(reviewId);
    } catch (error) {
      console.error(`Unable to get review: ${error}`);
      return { error: error };
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await Review.findByIdAndUpdate(
        reviewId,
        { user: user, review: review },
        { new: true }
      );
      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error: error };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await Review.findByIdAndDelete(reviewId);
      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      return { error: error };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      return await Review.find({ movieId: movieId }).exec();
    } catch (error) {
      console.error(`Unable to get reviews: ${error}`);
      return { error: error };
    }
  }
}
