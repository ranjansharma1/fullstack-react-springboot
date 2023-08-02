import { useOktaAuth } from "@okta/okta-react";
import BookModel from "../../../models/BookModel"
import { useEffect, useState } from "react";

export const ChangeQuantitiesItem: React.FC<{ book: BookModel, setIsbookDeleted: any }> = (props) => {
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    const baseUrl: string = "http://localhost:8080/api"; // this should not change   

    useEffect(() => {
        const fetchBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
        };
        fetchBookInState();
    }, []);

    async function increaseQuantity() {
        const url = `${baseUrl}/admin/secure/book/increase?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
        console.log(props.book.id)
        console.log("Increase: ", url)
        console.log('quantity: ' + quantity + ' remaining: ' + remaining);

    }

    async function decreaseQuantity() {
        console.log(props.book.id)
        const url = `${baseUrl}/admin/secure/book/decrease?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
        console.log("Decrease: ", url)
        console.log('quantity: ' + quantity + ' remaining: ' + remaining);
    }

    async function deleteBook() {
        const url = `${baseUrl}/admin/secure/book/delete?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.setIsbookDeleted(true);
    }
    return (
        <div className="m-4" >
            <div className="card p-3 shadow rounded">
                <div className=" row">
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        {props.book.img ? (
                            <img src={props.book.img} width="123" height="196" alt="book" />
                        ) : (
                            <img
                                src={require("../../../images/BooksImages/book1.png")}
                                width="123"
                                height="196"
                                alt="default"
                            />
                        )}
                    </div>
                    <div className="card-body col-md-6">
                        <h6 className="card-subtitle">{props.book.author}</h6>
                        <h5 className="card-title">{props.book.id}. {props.book.title}</h5>
                        <p className="card-text">{props.book.description?.slice(0, 350)}...</p>
                    </div>
                    <div className="col-md-3">
                        <p>Total Quantity: <b>{quantity}</b></p>
                        <p>Books Remaining: <b>{remaining}</b></p>
                        <hr />
                        <div className="mb-3">
                            <button onClick={increaseQuantity} type="button" className="btn btn-primary w-100">Add Quantity</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={decreaseQuantity} type="button" className="btn btn-warning w-100">Decrease Quantity</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={deleteBook} type="button" className="btn btn-danger w-100" >Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}