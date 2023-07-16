import { useEffect, useState } from "react";
import book1 from "../../images/BooksImages/book1.png";
import { Checkout } from "./Checkout";
import { StarsReview } from "./ReviewComponents/StarsReview";
import { LatestReview } from "./ReviewComponents/LatestReview";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

/**
 * window.location.pathname.split("/")[2]:---------------------->
 *
 * window.location.pathname: returns the current URL path of the browser window. For example, if the URL is "https://example.com/checkout/123", window.location.pathname would be "/checkout/123".
 *
 * .split("/")[2]: It splits the path string into an array using the "/" character as the separator. In the above example, it would result in the array ["", "checkout", "123"].
 *                                                   0       1         2
 */

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState(null);

  const bookId = window.location.pathname.split("/")[2]; //check Note for more details
  console.log(`Book ID  ` + bookId);

  useEffect(() => {
    const fetchBooks = async () => {
      const url: string = `http://localhost:8080/api/books/${bookId}`;
      console.log("URL: " + url);

      const response = await fetch(url);
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

  if (isLoading) {
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
            <StarsReview rating={2.5} size={32} />
          </div>
        </div>
        <div className="col-md-4 d-flex my-3">
          <Checkout book={book} />
        </div>
      </div>
      <hr />
      <LatestReview />
    </div>
  );
};
