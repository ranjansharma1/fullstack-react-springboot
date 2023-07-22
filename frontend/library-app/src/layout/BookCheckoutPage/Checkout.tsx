import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { AddNewReview } from "./ReviewComponents/AddNewReview";

export const Checkout: React.FC<{
  book: BookModel | undefined;
  currentCheckedBook: number;
  isBookChecked: Boolean;
  isAuthenticated: any;
  checkoutBook: any;
  isReviewAdded:any;
}> = (props) => {
  function checkoutBookRender() {
    if (props.isAuthenticated) {
        if(props.book?.copiesAvailable === undefined || props.book.copiesAvailable <= 0)
            return <h6 className="text-danger">Out Of Stock!</h6>
        else if (!props.isBookChecked && props.currentCheckedBook < 5 )
            return (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                    props.checkoutBook();
                    }}
                >
                    Checkout
                </button>
                );
        else if (!props.isBookChecked)
            return <h6 className="text-danger">Too Many Books Checked out!</h6>;
        else if (props.isBookChecked)
            return (
            <h6 className="text-success">
                Congrats, Book Checkout Successfully, enjoy!
            </h6>
            );
    }

    return (
      <Link to="/login" type="button" className="btn btn-danger">
        Log In
      </Link>
    );
  }

  function reviewBookRender(){
    if(props.isAuthenticated){
      if(!props.isReviewAdded)
        return <AddNewReview/>
      return <h6 className="text-success">Thanks for your Feedback!</h6>
    }
    return <p className="text-danger">Sign in to be able to leave a review</p>;
  }
  return (
    <div className="card container ms-2">
      <div className="card-body">
        <p>
          <b>{props.currentCheckedBook}/5</b> books Checked out
        </p>
        <hr />
        {props.book &&
        props.book.copiesAvailable &&
        props.book.copiesAvailable > 0 ? (
          <h4 className="text-success">Available</h4>
        ) : (
          <h4 className="text-danger">Wait List</h4>
        )}
        <div className="mb-3 row">
          <span className="col">
            <b>{props.book?.copies}</b> Copies
          </span>
          <span className="col">
            <b>{props.book?.copiesAvailable}</b> Available
          </span>
        </div>
        {checkoutBookRender()}
        <hr />
        <p>This number can change until placing order has been complete</p>
        {reviewBookRender()}
      </div>
    </div>
  );
};
