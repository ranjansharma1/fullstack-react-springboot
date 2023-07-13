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
  const [searchBook, setSearchBook] = useState("");
  const [searchURL, setSearchURL] = useState("");
  const [bookCategory, setBookCategory] = useState("Book Category");

  const baseUrl: string = "http://localhost:8080/api/books"; // this should not change
  let url = `${baseUrl}?size=5&page=0`; // Set the page to 0 for new searches

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchURL) { //this will only execute when searchURL is set to "";
        url = searchURL;
      }
      setIsLoading(true);
      try {
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
        setTotalResult(responseJSON.page.totalElements);
      } catch (error: any) {
        setHttpError(error.message);
      }
      setIsLoading(false);
    };

    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.log(error.message);
    });
  }, [searchURL]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    if(searchURL===""){
      url = `${baseUrl}?page=${nextPage}&size=5`;
    }else{
      url=`${searchURL}&page=${nextPage}&size=5`
    }
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const parseData = await response.json();
      // the spread operator (...) is used to create a new array that contains the previous books (prevBooks) as well as the new books fetched from parseData._embedded.books. It is concating the array adding to the previos array...
      setBookAPI((prevBooks) => [...prevBooks, ...parseData._embedded.books]);
      setTotalResult(parseData.page.totalElements);
    } catch (error: any) {
      setHttpError(error.message);
    }
    setIsLoading(false);
    setPage(nextPage);
  };
  

  const searchHandleChange = () => {
    setPage(0); // Reset page to 0
    if (searchBook) {
      setSearchURL(`${baseUrl}/search/findByTitleContaining?title=${searchBook}`);
    } else {
      setSearchURL("");
    }
    setBookCategory("Book Category");
  };
  

  const handleCategoryChange = (value: string) => {
    setPage(0); // Reset page to 0
    const lowercaseValue = value.toLowerCase();

    const categoryMappings: { [key: string]: string } = {
      fe: "Frontend",
      be: "Backend",
      data: "Data Science",
      devops: "Devops",
    };

    const mappedValue = categoryMappings[lowercaseValue] || "ALL";

    setBookCategory(mappedValue);
    if (mappedValue !== "ALL") {
      setSearchURL(`${baseUrl}/search/findByCategory?category=${lowercaseValue}`);
    } else {
      setSearchURL("");
    }
  };

  const renderHttpError = () => {
    if (httpError) {
      return (
        <div className="container m-5 text-center text-danger">
          <h1>{httpError}</h1>
        </div>
      );
    }
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
                onChange={(e) => setSearchBook(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => searchHandleChange()}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                id="dropdownMenuButton"
                className="btn btn-secondary dropdown-toggle"
                type="button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {bookCategory}
              </button>

              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  onClick={() => {
                    handleCategoryChange("All");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li
                  onClick={() => {
                    handleCategoryChange("fe");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Frontend
                  </a>
                </li>
                <li
                  onClick={() => {
                    handleCategoryChange("be");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Backend
                  </a>
                </li>
                <li
                  onClick={() => {
                    handleCategoryChange("data");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Data Science
                  </a>
                </li>
                <li
                  onClick={() => {
                    handleCategoryChange("devops");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Devops
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {totalResult > 0 ? (
          <div>
            <h4>Number of Books Available : {totalResult}</h4>
            <p>
              1 to {(page + 1) * 5 < totalResult ? (page + 1) * 5 : totalResult}{" "}
              of {totalResult} Items:
            </p>
            {(isLoading && <SpinnerLoading />) || renderHttpError()}
            <InfiniteScroll
              dataLength={bookAPI.length}
              next={fetchMoreData}
              hasMore={bookAPI.length !== totalResult}
              loader={<SpinnerLoading />}
            >
              {bookAPI.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <div className="m-5">
            <h3>Can't find what you are looking for?</h3>
            <a
              type="button"
              className="btn btn-primary btn-md px-4 me-md-2 fw-bold text-white"
              href="#"
            >
              Library Services
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
