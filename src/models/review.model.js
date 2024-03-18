import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    movieId: { type: Number, required: true },
    user: { type: String, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
