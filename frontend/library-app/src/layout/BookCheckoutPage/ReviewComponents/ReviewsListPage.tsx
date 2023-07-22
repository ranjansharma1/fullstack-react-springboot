import { useEffect, useState } from "react";
import { SingleReviewPage } from "./SingleReviewPage";
import ReviewModel from "../../../models/ReviewModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

/**
 * window.location.pathname.split("/")[2]:---------------------->
 *
 * window.location.pathname: returns the current URL path of the browser window. For example, if the URL is "https://example.com/checkout/123", window.location.pathname would be "/checkout/123".
 *
 * .split("/")[2]: It splits the path string into an array using the "/" character as the separator. In the above example, it would result in the array ["", "checkout", "123"].
 *                                                   0       1         2
 * 
 * 
 */


export const ReviewsListPage = () => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [httpError, setHttpError] = useState(null);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    // extrat bookId from current window location
    const bookId = window.location.pathname.split("/")[2];

    useEffect(() => {
        const fetchReviews = async () => {
            const url: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const response = await fetch(url);//it will wait to complete this request
            if (!response.ok)
                throw new Error("Something went wrong");
            const responseJSON = await response.json();
            const responseJSONData = responseJSON._embedded.reviews;
            const loadAllReviewsFromDatabse: ReviewModel[] = [];
            for (const key in responseJSONData) {
                loadAllReviewsFromDatabse.push({
                    id: responseJSONData[key].id,
                    book_id: responseJSONData[key].book_id,
                    userEmail: responseJSONData[key].userEmail,
                    date: responseJSONData[key].date,
                    rating: responseJSONData[key].rating,
                    reviewDescription: responseJSONData[key].reviewDescription,
                });
            };

            // console.log("loadResponse: "+ loadAllReviewsFromDatabse.length);
            setReviews(loadAllReviewsFromDatabse);
            setIsLoadingReviews(false)
        }
        fetchReviews().catch((error: any) => {
            setHttpError(error.massage);
            setIsLoadingReviews(false);
        });
    }, []);

    if (isLoadingReviews) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5 text-center text-danger">
                <p>{httpError}</p>
            </div>
        );
    }


    //Although review is very less so , we will not impliment infinite srolling, we will update later this part
    return (
        <div className="container">
            <h1 className="my-4">Comments ({reviews.length}) : </h1>
            {reviews.length > 0 ? (
                <div className="container">
                    {reviews.map(review =>
                        <SingleReviewPage review={review} key={review.id} />
                    )}
                </div>
            ) : (
                <div className="m-3">
                    <p className="lead">Currently there are no reviews for this book</p>
                </div>
            )}
        </div>
    );
};
