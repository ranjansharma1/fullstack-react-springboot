import { StarsReview } from "./StarsReview";

export const LatestReview = () => {
  return (
    <div className="row container my-3">
      <div className="col-md-2 fs-3 fw-bold">Latest Reviews:</div>
      <div className="col-md-10">
        <div className="d-flex align-items-center ">
          <div style={{width:"500px", paddingRight:"30px"}} >
            <h5>ranjansharma@gmail.com</h5>
            <h6>Sept 5, 2023</h6>
            <p >This book is preety good, giving 5 rating</p>
          </div>
          <StarsReview rating={3.5} size={16} />
        </div>
        <hr />
        <button type="button" className="btn btn-primary">
          React All Review
        </button>
      </div>
    </div>
  );
};
