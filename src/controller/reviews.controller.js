import ReviewsDAO from "../service/reviews.service.js";

export default class ReviewController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movieId;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      if (reviewResponse.error) {
        return res.status(400).json({ error: reviewResponse.error });
      }

      return res.status(201).json({ success: true, review: reviewResponse.review });
    } catch (error) {
      console.error(`Error posting review: ${error.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (review.error) {
        return res.status(400).json({ error: review.error.message });
      }
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({ error: error });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);
      let { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review");
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);

      if (!reviews) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(reviews);
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({ error: error });
    }
  }
}
