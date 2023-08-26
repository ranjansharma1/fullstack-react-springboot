import React from "react"
import BorrowedBook from "../../../../models/BorrowedBook"
import '../../../../App.css'


/**How Botstrap Model Works
 * 1. Setting data-bs-toggle="modal" data-bs-target="#myModal" in button tag of manage Book in src\layout\BookSelfPage\BorrowedBook\component\BorrowedSingleBookItem.tsx
 * 2. Add ManageBookModel in BorrowedSingleBookItem.tsx file below
 * 3. give same Id anme as data-bs-target in BorrowedSingleBookItem to this component
 * 4. paste the model bootstrap in this file below
 * 
 * 5. data-bs-backdrop='static':
When you set data-bs-backdrop="static", it prevents the modal from being closed when a user clicks outside the modal's content or presses the "Escape" key. In other words, it makes the modal non-dismissable by clicking outside or pressing the "Escape" key. The user can only close the modal through custom interactions, such as clicking on specific buttons inside the modal.


*  6. data-bs-keyboard='false':
When you set data-bs-keyboard="false", it disables the ability to close the modal by pressing the "Escape" key. This attribute complements the data-bs-backdrop attribute by controlling the keyboard interaction with the modal. Even if data-bs-backdrop is set to "static," if data-bs-keyboard is set to "false," the modal cannot be dismissed by pressing the "Escape" key.
*
*
*(event) => event.preventDefault(): If the condition is true (the book is overdue), this function is executed when the button is clicked. The event.preventDefault() is used to prevent the default behavior of the button click. In other words, when the book is overdue, clicking the button won't trigger any action. It effectively disables the button click.
 */
export const ManageBookModel: React.FC<{ borrowed: BorrowedBook, returnBook: any, renewBook: any, setDisplayWarning: any, setAlertMassage:any }> = (props) => {
    function returnBookBtn(){
        props.returnBook(props.borrowed.book.id);
        props.setDisplayWarning(true);
        props.setAlertMassage("Book return successfully.");
        // Hide the alert after 3 seconds
        setTimeout(() => {
            props.setDisplayWarning(false);
            props.setAlertMassage('');
        }, 3000);
    }
    function renewBookDateBtn(){
        props.renewBook(props.borrowed.book.id);
        props.setDisplayWarning(true);
        props.setAlertMassage("Book Renewed for 7 days.");
        // Hide the alert after 3 seconds
        setTimeout(() => {
            props.setDisplayWarning(false);
            props.setAlertMassage('');
        }, 3000);
    }
    return (
        <div className="modal blur-effect" id={`book${props.borrowed.book.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop='static' data-bs-keyboard='false'>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Manage Book</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-2 d-flex justify-content-center my-2">
                                {props.borrowed.book.img ? (
                                    <img src={props.borrowed.book.img} width="56" height="87" alt="book" />
                                ) : (
                                    <img src={require("../../../../images/BooksImages/book1.png")} width="56" height="87" alt="book" />
                                )}
                            </div>
                            <div className="col-md-10">
                                <h6>{props.borrowed.book.author}</h6>
                                <h5>{props.borrowed.book.title}</h5>
                                <p>Issue Date: {props.borrowed.checkoutDate} </p>
                            </div>

                        </div>
                        <hr />
                        {props.borrowed.daysLeft > 0 &&
                            <p className='text-secondary'>
                                Due in {props.borrowed.daysLeft} days.
                            </p>
                        }
                        {props.borrowed.daysLeft === 0 &&
                            <p className='text-success'>
                                Due Today.
                            </p>
                        }
                        {props.borrowed.daysLeft < 0 &&
                            <p className='text-danger'>
                                Past due by {props.borrowed.daysLeft} days.
                            </p>
                        }
                        <div className="container list-group">
                            <button
                                onClick={returnBookBtn}
                                type="button"
                                data-bs-dismiss='modal'
                                className='list-group-item list-group-item-action' aria-current='true'
                            >
                                Return Book
                            </button>

                            <button
                                onClick={
                                    props.renewBook.daysLeft < 0 ?
                                        (event) => event.preventDefault()
                                        :
                                        () => {renewBookDateBtn()}
                                }
                                type="button"
                                data-bs-dismiss='modal'
                                className={
                                    props.borrowed.daysLeft < 0 ?
                                        'list-group-item list-group-item-action disabled' :
                                        'list-group-item list-group-item-action'
                                }
                            >

                                {props.borrowed.daysLeft < 0 ?
                                    'Late dues cannot be renewed' : 'Renew Book for 7 days'
                                }
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}