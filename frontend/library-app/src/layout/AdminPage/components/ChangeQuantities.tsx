import { error } from "console";
import { useEffect, useState } from "react"
import BookModel from "../../../models/BookModel";
import { ChangeQuantitiesItem } from "./ChangeQuantitiesItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const ChangeQuantities = () => {

    //Book API state
    const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    //Infinite loading state
    const [page, setPage] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    //search book state
    const [searchBook, setSearchBook] = useState("");
    const [searchURL, setSearchURL] = useState("");
    const [bookCategory, setBookCategory] = useState("Book Category");

    const baseUrl: string = "http://localhost:8080/api/books"; // this should not change
    let url = `${baseUrl}?size=5&page=0`; // Set the page to 0 for new searches

    const categories: { [key: string]: string } = {
        All: "All",
        fe: "Frontend",
        be: "Backend",
        data: "Data Science",
        devops: "Devops",
    };

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            if (searchURL) {
                //this will only execute when searchURL is set to "";
                url = searchURL;
            }
            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Something went wrong");
            const responseJSON = await response.json();
            setBookAPI(responseJSON._embedded.books);
            setTotalResult(responseJSON.page.totalElements);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [searchURL]);

    const fetchMoreData = async () => {
        setIsLoading(true);
        const nextPage = page + 1;
        if (searchURL === "")
            url = `${baseUrl}?page=${nextPage}&size=5`;
        else
            url = `${searchURL}&page=${nextPage}`;
        const response = await fetch(url);

        if (!response.ok)
            throw new Error("Something went wrong");
        const parseData = await response.json();
        // the spread operator (...) is used to create a new array that contains the previous books (prevBooks) as well as the new books fetched from parseData._embedded.books. It is concating the array adding to the previos array...
        setBookAPI((prevBooks) => [...prevBooks, ...parseData._embedded.books]);
        setTotalResult(parseData.page.totalElements);
        setIsLoading(false);
        setPage(nextPage);
    };

    const searchHandleChange = () => {
        setPage(0); // Reset page to 0
        setBookAPI([]); // Reset to empty books
        if (searchBook)
            setSearchURL(`${baseUrl}/search/findByTitleContaining?title=${searchBook}&size=5`);
        else
            setSearchURL("");
        setBookCategory("Book Category");
    };

    const handleCategoryChange = (value: string) => {
        setPage(0); // Reset page to 0
        setBookAPI([]);
        setBookCategory(categories[value]);
        if (value === "All")
            setSearchURL("");
        else
            setSearchURL(`${baseUrl}/search/findByCategory?category=${value}&size=5`);
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
        <div className="container m-1">
            <div className="row my-3">
                <div className="col-6">
                    <div className="d-flex">
                        <input type="search" className="form-control me-2" placeholder="Search" aria-labelledby="Search" onChange={(e) => setSearchBook(e.target.value)} />
                        <button type="button" className="btn btn-outline-success" onClick={() => searchHandleChange()} > Search </button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="dropdown">
                        <button id="dropdownMenuButton" className="btn btn-secondary dropdown-toggle" type="button" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {bookCategory}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                            {Object.entries(categories).map(([key, value]) => (
                                <li key={key} onClick={() => handleCategoryChange(key)}>
                                    <a className="dropdown-item" href="#">
                                        {value}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {totalResult > 0 ? (
                <>
                    <h4 className="mt-3">Number os Results: ({totalResult})</h4>
                    <h6 className="text-secondary">
                        1 to {(page + 1) * 5 < totalResult ? (page + 1) * 5 : totalResult} of {totalResult} Items:
                    </h6>
                    {isLoading || renderHttpError()}
                    <InfiniteScroll
                        dataLength={bookAPI.length}
                        next={fetchMoreData}
                        hasMore={bookAPI.length !== totalResult}
                        loader={<SpinnerLoading />}
                    >
                        {bookAPI.map(book => (
                            <ChangeQuantitiesItem key={book.id} book={book} />
                        ))}
                    </InfiniteScroll>
                </>
            ) : (
                <h4 className="m-5 text-danger">Add a book before changing quantity...</h4>
            )}
        </div>
    )
}