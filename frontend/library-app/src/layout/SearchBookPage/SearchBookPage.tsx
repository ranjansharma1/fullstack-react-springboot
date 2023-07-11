import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import BookModel from "../../models/BookModel";
import { SearchBook } from "./component/SearchBook";

export const SearchBookPage = () => {
  const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      const url: string = `${baseUrl}`;
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
      console.log(error.massage);
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
  return (
    <section>
      <div className="container mt-3">
        <div className="row my-2">
          <div className="col-6">
            <div className="d-flex">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search"
                aria-labelledby="Search"
              />
              <button type="button" className="btn btn-outline-success">Search</button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Book Category
              </button>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Frontend
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Data
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Devops
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h4>Number of Results : (22)</h4> 
          <p>1 to 5 to 22 Items:</p>
          {bookAPI.map((book)=>(
            <SearchBook book={book} key={book.id}/>
          ))}
        </div>
      </div>
    </section>
  );
};
