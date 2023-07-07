import exploreNewBooksImg1 from "../../../images/exploreNewBooksImg3.jpg";

export default function ExploreNewBooks() {
  return (
    <section id="#exploreNewBooks" >
      <div
        className="container-fluid p-5 text-white"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0,0.5), rgba(0, 0, 0, 0.2) ), url(${exploreNewBooksImg1})`,
          width: "100%",
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <div className="">
            <h1>Find your next adventure</h1>
            <p className="fw-bolder">Where would you like to go next?</p>
            <button type="button" className="btn btn-primary fw-semibold">
              Explore top books
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
