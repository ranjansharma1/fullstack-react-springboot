import { Link } from "react-router-dom"
import { ManageBookModel } from "./ManageBookModel"
import BorrowedBook from "../../../../models/BorrowedBook"

export const BorrowedSingleBookItem: React.FC<{ borrowedBookList: BorrowedBook[] }> = (props) => {
    return (
        <div>
            {props.borrowedBookList.map(borrowed =>
                <div key={borrowed.book.id}>
                    <div className="row mt-4 " >
                        <div className="container col-lg-4 d-flex justify-content-center my-3">
                            {borrowed.book.img ? (
                                <img src={borrowed.book.img} width="226" height="349" alt="book" />
                            ) : (
                                <img src={require("../../../../images/BooksImages/book1.png")} width="226" height="349" alt="book" />
                            )}
                        </div>
                        <div className="container card col-lg-3 d-flex">
                            <div className="card-body" >
                                <h5 className="card-title">{borrowed.book.title}</h5>
                                {borrowed.daysLeft > 0 &&
                                    <p className='text-secondary'>
                                        Due in {borrowed.daysLeft} days.
                                    </p>
                                }
                                {borrowed.daysLeft === 0 &&
                                    <p className='text-success'>
                                        Due Today.
                                    </p>
                                }
                                {borrowed.daysLeft < 0 &&
                                    <p className='text-danger'>
                                        Past due by {borrowed.daysLeft} days.
                                    </p>
                                }
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

            )}
        </div>
    )
}