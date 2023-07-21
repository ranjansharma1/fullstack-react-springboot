import BookModel from "../../models/BookModel"

export const Checkout:React.FC<{book: BookModel| undefined, currentCheckedBook:number}> = (props) => {
  return (
    <div className="card container ms-2" >
        <div className="card-body">
            <p> <b>{props.currentCheckedBook}/5</b> books Checked out</p>
            <hr />
            {/* <h3 className="text-success">Available</h3> */}
            {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
            <div className="mb-3 row">
                <span className="col"> <b>{props.book?.copies}</b> Copies</span>
                <span className="col"> <b>{props.book?.copiesAvailable}</b> Available </span>
            </div>
            <button className="btn btn-success" type="button">Sign In</button>
            <hr />
            <p>This number can change until placing order has been complete</p>
            <p>Sign in to be able to leave a review</p>
        </div>
    </div>
  )
}