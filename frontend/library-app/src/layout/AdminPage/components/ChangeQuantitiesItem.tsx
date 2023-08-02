import BookModel from "../../../models/BookModel"

export const ChangeQuantitiesItem: React.FC<{ book: BookModel }> = (props) => {
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
                        <h5 className="card-title">{props.book.title}</h5>
                        <p className="card-text">{props.book.description?.slice(0,350)}...</p>
                    </div>
                    <div className="col-md-3">
                        <p>Total Quantity: <b>{props.book.copies}</b></p>
                        <p>Books Remaining: <b>{props.book.copiesAvailable}</b></p>
                        <hr />
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary w-100">Add Quantity</button>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-warning w-100">Decrease Quantity</button>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-danger w-100" >Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}