import React, { useEffect, useState } from "react";
import book1 from "../../../images/BooksImages/book1.png";
import book2 from "../../../images/BooksImages/book2.png";
import book3 from "../../../images/BooksImages/book3.png";
import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseJSON = await response.json();
      const responseJSONData = responseJSON._embedded.books;
      const loadedBookfromDatabase: BookModel[] = [];

      for (const key in responseJSONData) {
        loadedBookfromDatabase.push({
          id: responseJSONData[key].id,
          title: responseJSONData[key].title,
          author: responseJSONData[key].author,
          description: responseJSONData[key].description,
          copies: responseJSONData[key].copies,
          copiesAvailable: responseJSONData[key].copiesAvailable,
          category: responseJSONData[key].category,
          img: responseJSONData[key].img,
        });
      }
      setBookAPI(loadedBookfromDatabase);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
      // console.log(error.massage);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <h1>{httpError}</h1>
      </div>
    );
  }

  const books = [
    {
      id: 1,
      title: "first book",
      img: book1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 2,
      title: "Second book",
      img: book2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 3,
      title: "Third book",
      img: book3,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 4,
      title: "Fourth book",
      img: book2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 5,
      title: "fifth book",
      img: book3,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>

      {/* Desktop */}
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block 
        "
        data-bs-interval="false"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(6, 9).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div
        id="carouselExampleControls2"
        className="carousel carousel-dark slide mt-5 d-lg-none
        "
        data-bs-interval="false"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(0, 1).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(1, 2).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(2, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {bookAPI.slice(3, 4).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls2"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls2"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
