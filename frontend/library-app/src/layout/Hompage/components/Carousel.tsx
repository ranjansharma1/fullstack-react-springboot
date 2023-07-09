import React from "react";
import book1 from "../../../images/BooksImages/book1.png";
import book2 from "../../../images/BooksImages/book2.png";
import book3 from "../../../images/BooksImages/book3.png";
import ReturnBook from "./ReturnBook";

function Carousel() {
  const books = [
    {
      id: 1,
      title: "first book",
      image: book1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 2,
      title: "Second book",
      image: book2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 3,
      title: "Third book",
      image: book3,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 4,
      title: "Fourth book",
      image: book2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
    {
      id: 5,
      title: "fifth book",
      image: book3,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid cum eum porro sapiente modi corrupti, quos nesciunt delectus ratione odit ad temporibus ducimus a ipsa deleniti. Neque, possimus assumenda.",
    },
  ];

  return (
    <div className="container mt-5" style={{ height: 550 }}>
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
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 6).map((book) => (
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
              {books.slice(0, 1).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(1, 2).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(2, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 4).map((book) => (
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
      <div className='homepage-carousel-title mt-3'>
        <a className='btn btn-outline-secondary btn-lg' href='#'>View More</a>
      </div>
    </div>
  );
}

export default Carousel;
