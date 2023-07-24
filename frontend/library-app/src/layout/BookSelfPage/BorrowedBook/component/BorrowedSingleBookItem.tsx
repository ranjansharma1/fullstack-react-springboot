import { Link } from "react-router-dom"
import { ManageBookModel } from "./ManageBookModel"

export const BorrowedSingleBookItem = () => {
    return (
        <div>
            <div className="row mt-4 ">
                <div className="container col-lg-4 d-flex justify-content-center my-3">
                    <img src={require("../../../../images/BooksImages/book1.png")} width="226" height="349" alt="book" />
                </div>
                <div className="container card col-lg-3 d-flex">
                    <div className="card-body" >
                        <h5 className="card-title">Borrowed Option</h5>
                        <h6 className="card-subtitle mb-2 text-danger">Past due by - 8 days</h6>
                        <div>
                            <div className="list-group mt-3">
                                <button className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#myModal">Manage Book</button>
                                <Link to='/search' className="list-group-item list-group-item-action">Search More Books?</Link>
                            </div>
                        </div>
                        <hr />
                        <p className="card-text">Help Other to find their adventure by reviewing your books</p>
                        <Link to="#" className="card-link btn btn-primary" type="button">Leave a Review</Link>
                    </div>
                </div>
            </div>
            <hr />
            <ManageBookModel/>
        </div>
    )
}