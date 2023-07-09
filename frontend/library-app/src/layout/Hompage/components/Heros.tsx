import hero1 from "../../../images/Heros1.jpg";
import hero2 from "../../../images/Heros2.jpg";

const Heros = () => {
  return (
    <section className="container m-5 ">
      <div className="row">
        <div className="col-md-6 px-0" style={{ backgroundColor: "red" }}>
          <div
            className="image-container"
            style={{ height: "300px", width: "100%" }}
          >
            <img
              src={hero1}
              alt="Image 1"
              className="img-fluid h-100 w-100"
              style={{
                objectFit:
                  "cover" /* Set the desired object-fit value: contain, cover, etc. */,
              }}
            />
          </div>
        </div>
        <div className="col-md-6 px-0">
          <div className="card px-5" style={{ height: "300px", width: "100%" }}>
            <div className="card-body">
              <h1 className="card-title">What have you been reading?</h1>
              <p className="card-text">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
              <button className="btn btn-primary" type="button">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row " style={{border:"2px solid black"}}>
        {/* Desktop */}
        <div className="col-md-6 px-0 d-none d-lg-block">
          <div className="card px-5" style={{ height: "300px", width: "100%" }}>
            <div className="card-body">
              <h1 className="card-title">Our collection is always changing!</h1>
              <p className="card-text">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most accurate book selection
                possible for our Luv 2 Read students! We are diligent about our
                book selection and our books are always going to be our top
                priority.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 px-0 d-none d-lg-block">
          <div
            className="image-container"
            style={{ height: "300px", width: "100%" }}
          >
            <img
              src={hero2}
              alt="Image 1"
              className="img-fluid h-100 w-100"
              style={{
                objectFit:
                  "cover" /* Set the desired object-fit value: contain, cover, etc. */,
              }}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="col-md-6 px-0 d-lg-none">
          <div
            className="image-container"
            style={{ height: "300px", width: "100%" }}
          >
            <img
              src={hero2}
              alt="Image 1"
              className="img-fluid h-100 w-100"
              style={{
                objectFit:
                  "cover" /* Set the desired object-fit value: contain, cover, etc. */,
              }}
            />
          </div>
        </div>
        <div className="col-md-6 px-0 d-lg-none">
          <div className="card px-5" style={{ height: "300px", width: "100%" }}>
            <div className="card-body">
              <h1 className="card-title">Our collection is always changing!</h1>
              <p className="card-text">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most accurate book selection
                possible for our Luv 2 Read students! We are diligent about our
                book selection and our books are always going to be our top
                priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heros;
