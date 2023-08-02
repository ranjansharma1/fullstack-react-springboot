import { error } from "console";
import { useEffect, useState } from "react"
import BookModel from "../../../models/BookModel";
import { ChangeQuantitiesItem } from "./ChangeQuantitiesItem";

export const ChangeQuantities = () => {

    //Book usState
    const [bookAPI, setBookAPI] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const baseUrl: string = "http://localhost:8080/api"; // this should not change

    useEffect(() => {
        const fetchBooks = async () => {
            const url: string = `${baseUrl}/books`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Something went wrong");
            const responseJSON = await response.json();
            setBookAPI(responseJSON._embedded.books);
            setIsLoading(false);
            console.log(responseJSON._embedded.books)
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, [])

    return (
        <div className="m-1">
            <h4 className="mt-3">Number os Results: ({bookAPI.length})</h4>
            <h6 className="text-secondary">1 to 5 of {bookAPI.length} items</h6>
            {bookAPI.map(book => (
                <ChangeQuantitiesItem key={book.id} book={book}/>
            ))}
        </div>
    )
}