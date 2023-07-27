import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react"
import { BorrowedSingleBookItem } from "./component/BorrowedSingleBookItem"
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import BorrowedBook from "../../../models/BorrowedBook";
import { Link } from "react-router-dom";

export const BorrowedbookPage = () => {
    const { authState } = useOktaAuth();
    const [borrowedBookList, setBorrowedBookList] = useState<BorrowedBook[]>([]);
    const [isLoadingBorrowedBookPage, setIsLoadingBorrowedBookPage] = useState(true);
    const [httpError, sethttpError] = useState(null);
    const [checkout, setCheckout] = useState(false);
    const baseUrl: string = "http://localhost:8080/api";

    useEffect(() => {
        const fetchBorrowedBookList = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `${baseUrl}/books/secure/borrowedbook`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(url, requestOptions);
                if (!response.ok)
                    throw new Error("Something went wrong");
                const responseJSON = await response.json();
                const borrowedBooksFromDatabase: BorrowedBook[] = [];
                for (const key in responseJSON) {
                    borrowedBooksFromDatabase.push({
                        daysLeft: responseJSON[key].daysLeft,
                        book: responseJSON[key].book
                    })
                };
                setBorrowedBookList(borrowedBooksFromDatabase);
                setIsLoadingBorrowedBookPage(false);
                // console.log(borrowedBooksFromDatabase);
            }
        }
        fetchBorrowedBookList().catch((error: any) => {
            setIsLoadingBorrowedBookPage(false);
            sethttpError(error.massage);
        })

    }, [authState, checkout]);

    async function returnBook(bookId: number) {
        const url = `${baseUrl}/books/secure/return?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewBook(bookId: number) {
        const url = `${baseUrl}/books/secure/renew?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    if (isLoadingBorrowedBookPage) {
        return <SpinnerLoading />
    }
    if (httpError) {
        return (
            <div className="container m-5 text-center text-danger">
                <p>{httpError}</p>
            </div>
        );
    }
    return (
        <div className="container mt-3 ">
            {borrowedBookList.length > 0 ?
                <>
                    <h4>Current Books:</h4>
                    <BorrowedSingleBookItem borrowedBookList={borrowedBookList} returnBook={returnBook} renewBook={renewBook} />

                </>
                :
                <>
                    <h3 className='my-3'>
                        Currently no loans
                    </h3>
                    <Link className='btn btn-primary' to={`search`}>
                        Search for a new book
                    </Link>
                </>
            }
        </div>
    )
}