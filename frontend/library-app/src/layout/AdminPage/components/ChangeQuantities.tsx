import { error } from "console";
import { useEffect, useState } from "react"
import BookModel from "../../../models/BookModel";
import { ChangeQuantitiesItem } from "./ChangeQuantitiesItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const ChangeQuantities = () => {

    //Book usState
    const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    //Infinite loading state
    const [page, setPage] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    const baseUrl: string = "http://localhost:8080/api"; // this should not change

    useEffect(() => {
        const fetchBooks = async () => {
            const url: string = `${baseUrl}/books?page=0&size=7`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Something went wrong");
            const responseJSON = await response.json();
            setBookAPI(responseJSON._embedded.books);
            setIsLoading(false);
            // console.log(responseJSON._embedded.books);

            //Infinite Loading
            setTotalResult(responseJSON.page.totalElements);
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, []);

    const fetchMoreData = async () => {
        setIsLoading(true);
        const nextPage = page + 1;
        const url: string = `${baseUrl}/books?page=${nextPage}&size=7`
        // console.log("fetchmoredata: " + url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const parseData = await response.json();
        // the spread operator (...) is used to create a new array that contains the previous books (prevBooks) as well as the new books fetched from parseData._embedded.books. It is concating the array adding to the previos array...
        setBookAPI((prevBooks) => [...prevBooks, ...parseData._embedded.books]);
        setTotalResult(parseData.page.totalElements);
        setIsLoading(false);
        setPage(nextPage);
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
        <div className="m-1">
            {totalResult > 0 ? (
                <>
                    <h4 className="mt-3">Number os Results: ({totalResult})</h4>
                    <h6 className="text-secondary">
                        1 to {(page + 1) * 7 < totalResult ? (page + 1) * 7 : totalResult} of {totalResult} Items:
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