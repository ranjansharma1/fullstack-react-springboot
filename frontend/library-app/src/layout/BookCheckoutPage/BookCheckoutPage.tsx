import { useEffect, useState } from "react";
import book1 from "../../images/BooksImages/book1.png";
import { Checkout } from "./Checkout";
import { StarsReview } from "./ReviewComponents/StarsReview";
import { LatestReview } from "./ReviewComponents/LatestReview";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import ReviewModel from "../../models/ReviewModel";

/**
 * window.location.pathname.split("/")[2]:---------------------->
 *
 * window.location.pathname: returns the current URL path of the browser window. For example, if the URL is "https://example.com/checkout/123", window.location.pathname would be "/checkout/123".
 *
 * .split("/")[2]: It splits the path string into an array using the "/" character as the separator. In the above example, it would result in the array ["", "checkout", "123"].
 *                                                   0       1         2
 */

export const BookCheckoutPage = () => {

  //Book Checkout
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([])
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2]; //check Note for more details
  // console.log(`Book ID  ` + bookId);

  const baseUrl: string = "http://localhost:8080/api";

  useEffect(() => {
    const fetchBooks = async () => {
      const bookurl: string = `${baseUrl}/books/${bookId}`;
      console.log("Bookurl: " + bookurl);

      const response = await fetch(bookurl);
      if (!response.ok) {
        throw new Error("Something Went wrong with fetch");
      }

      const responseJSON = await response.json();
      const loadedBookfromDatabase: BookModel = {
        id: responseJSON.id,
        title: responseJSON.title,
        author: responseJSON.author,
        description: responseJSON.description,
        copies: responseJSON.copies,
        copiesAvailable: responseJSON.copiesAvailable,
        category: responseJSON.category,
        img: responseJSON.img,
      };
      setBook(loadedBookfromDatabase);
      setisLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setisLoading(false);
      sethttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewurl: string = `${baseUrl}/reviews/search/findByBookId?bookId=${bookId}`;
      console.log("reviewurl: " + reviewurl);
      const response = await fetch(reviewurl);
      const responseJSON = await response.json();
      const responseJSONData = responseJSON._embedded.reviews;
      const loadReviewsFromDatabse: ReviewModel[] = [];
      let totalRating:number=0;
      for (const key in responseJSONData) {
        loadReviewsFromDatabse.push({
          id: responseJSONData[key].id,
          book_id: responseJSONData[key].book_id,
          userEmail: responseJSONData[key].userEmail,
          date: responseJSONData[key].date,
          rating: responseJSONData[key].rating,
          reviewDescription: responseJSONData[key].reviewDescription,
        });
        totalRating=totalRating+responseJSONData[key].rating;
      }

      //This will execute when loadReviewFromDatabase is null
      if(loadReviewsFromDatabse){
        setTotalStars(Number((Math.round((totalRating / loadReviewsFromDatabse.length) * 2) / 2).toFixed(1)))
      }      
      setReviews(loadReviewsFromDatabse);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      sethttpError(error.message);
    });
  }, []);

  if (isLoading || isLoadingReview) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row me-3">
        <div className="col-md-2 mt-3 d-flex justify-content-center">
          {/*The ?. operator is used to access the img property of the book object.*/}
          {book?.img ? (
            <img src={book?.img} width="151" height="233" alt="book" />
          ) : (
            <img
              src={require("../../images/BooksImages/book1.png")}
              width="151"
              height="233"
              alt="book"
            />
          )}
        </div>
        <div className="col-md-6 ">
          <div className="card pe-5 border-0">
            <div className="card-body">
              <h5 className="card-title">{book?.title}</h5>
              <h6 className="card-subtitle mb-2 text-primary">
                {book?.author}
              </h6>
              <p className="card-text">{book?.description}</p>
            </div>
          </div>
          <div>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <div className="col-md-4 d-flex my-3">
          <Checkout book={book} />
        </div>
      </div>
      <hr />
      <LatestReview reviews={reviews} bookId={book?.id}/>
    </div>
  );
};
