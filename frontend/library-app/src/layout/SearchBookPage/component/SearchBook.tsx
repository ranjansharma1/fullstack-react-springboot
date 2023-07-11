import BookModel from "../../../models/BookModel";

export const SearchBook:React.FC<{book:BookModel}> = (props) => {
  return (
    <section>
      <div className="container border border-2 p-2 shadow my-5">
        <div className=" row d-flex justify-content-center align-items-center">
          <div className="col-md-2 d-flex justify-content-center align-items-center">
          {props.book.img ? 
                    <img
                        src={props.book.img}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    :
                    <img
                        src={require('../../../images/BooksImages/book1.png')}
                        width='151'
                        height='233'
                        alt="book"
                    />
                }
          </div>
          <div className="col-lg-8">
            <div className="card border-0">
              <div className="card-body">
                <h6 className="card-title">{props.book.author}</h6>
                <h5 className="card-title">{props.book.title}</h5>
                <p className="card-text">{props.book.description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-primary text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
