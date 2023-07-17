import React from "react";
import { StarsReview } from "./StarsReview";
import ReviewModel from "../../../models/ReviewModel";
import { SingleReviewPage } from "./SingleReviewPage";
import { Link } from "react-router-dom";

export const LatestReview: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
}> = (props) => {
  return (
    <div className="row container my-3">
      <div className="col-md-2 fs-3 fw-bold">Latest Reviews:</div>
      <div className="col-md-10">
        {props.reviews.length > 0 ? (
          <>
            {props.reviews.slice(0, 3).map((eachReview) => (
              <SingleReviewPage review={eachReview} key={eachReview.id}></SingleReviewPage>
            ))}

            <div className="m-3">
              <Link
                type="button"
                className="btn btn-primary btn-md text-white"
                to={`/reviewlist/${props.bookId}`}
              >
                Reach all reviews.
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
