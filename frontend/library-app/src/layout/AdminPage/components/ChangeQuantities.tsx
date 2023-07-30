export const ChangeQuantities = () => {
    return (
        <div className="m-3">
            <h4 className="mt-3">Number os Results: (23)</h4>
            <h6 className="text-secondary">1 to 5 of 23 items</h6>
            <div className="card p-3">
                <div className=" row">
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <img src={require("../../../images/BooksImages/book1.png")} width="123" height="196" alt="default" />
                    </div>
                    <div className="card-body col-md-6">
                        <h6 className="card-subtitle">Luv, Lena</h6>
                        <h5 className="card-title">Become a Guru in Javascript</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam rerum commodi, dolore veritatis assumenda molestiae dolorem reiciendis tenetur facere omnis iure, eligendi quas dolores consequatur eos eius fugit. Repellendus fugiat, quibusdam suscipit nisi quae architecto praesentium, beatae similique corporis quas incidunt. Velit quasi facere enim, vero molestias neque. Unde illo debitis consectetur enim culpa architecto saepe, dolorum cum quibusdam sequi!</p>
                    </div>
                    <div className="col-md-3">
                        <p>Total Quantity: 10</p>
                        <p>Books Remaining: 9</p>
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