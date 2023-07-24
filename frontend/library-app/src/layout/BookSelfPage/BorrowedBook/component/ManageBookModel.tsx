

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
 */
export const ManageBookModel = () => {
    return (
        <div className="modal" id="myModal" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop='static' data-bs-keyboard='false'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Manage Book</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-2 d-flex justify-content-center my-2">
                                <img src={require("../../../../images/BooksImages/book1.png")} width="56" height="87" alt="book" />
                            </div>
                            <div className="col-md-10">
                                <h6>Luv, Lene</h6>
                                <h5>Become a Guru in JavaScript</h5>
                            </div>

                        </div>
                        <hr />
                        <p className="text-secondary">Due in 7 days.</p>
                        <div className="container list-group">
                            <button type="button" className="list-group-item list-group-item-action" >Return Book</button>
                            <button type="button" className="list-group-item list-group-item-action">Renew Book for 7days</button>
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