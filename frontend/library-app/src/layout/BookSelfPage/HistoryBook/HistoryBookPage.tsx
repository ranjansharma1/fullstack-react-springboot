

export const HistoryBookPage = () => {
  return (
    <div className="m-3">
        <h5>Recent History:</h5>
        <div className="card shadow my-3 rounded">
            <div className="container row py-3 ">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                <img src={require("../../../images/BooksImages/book1.png")} width="123" height="196" alt="book" />
                </div>
                <div className="col-md-9 card-body">
                    <h5 className="card-subtitle">Luv, Priya</h5>
                    <h4 className="card-title">Become a Guru in Java</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vitae voluptatem amet itaque, officiis rerum ad nobis saepe maiores explicabo distinctio quasi dicta perferendis aut rem cum expedita deserunt facere, labore praesentium ullam eius voluptates? Cum tenetur omnis aut non natus quo animi excepturi magni aliquam, assumenda dolor nisi minus, soluta, quibusdam veritatis. Quos, voluptates quia explicabo mollitia praesentium quidem!</p>
                    <hr />
                    <p className="card-text text-success">Checked out on: 2022-10-22</p>
                    <p className="card-text text-danger">Returned on: 2022-10-20</p>
                </div>
            </div>
        </div>
        <hr />
    </div>
  )
}
