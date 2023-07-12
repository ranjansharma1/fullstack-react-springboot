import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import BookModel from "../../models/BookModel";
import { SearchBook } from "./component/SearchBook";
import InfiniteScroll from "react-infinite-scroll-component";

export const SearchBookPage = () => {
  const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      const url: string = `${baseUrl}?size=5&page=${page}`;
      setIsLoading(true)
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
      setTotalResult(responseJSON.page.totalElements)
      console.log("Total Elements: " + responseJSON.page.totalElements);
      setIsLoading(false);
      // setLoading(false)
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.log(error.massage);
    });
  }, []);
  const renderHttpError =() => {
    if (httpError) {
      return (
        <div className="container m-5 text-center text-danger">
          <h1>{httpError}</h1>
        </div>
      );
    }

  }
  
  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `http://localhost:8080/api/books?page=${page + 1}&size=5`;
    console.log("page: " + page);
    setIsLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setBookAPI(bookAPI.concat(parseData._embedded.books));
    setTotalResult(parseData.page.totalElements)
    setIsLoading(false);
  };
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
          <h4>Number of Books Available : {totalResult}</h4> 
          <p>1 to {(page+1)*5} to {totalResult} Items:</p>
          {isLoading && <SpinnerLoading /> || renderHttpError()}
        <InfiniteScroll
          dataLength={bookAPI.length}
          next={fetchMoreData}
          hasMore={bookAPI.length !== totalResult}
          loader={<SpinnerLoading />}
        >
          {bookAPI.map((book)=>(
            <SearchBook book={book} key={book.id}/>
          ))}
          </InfiniteScroll>
          
        </div>
      </div>
    </section>
  );
};
