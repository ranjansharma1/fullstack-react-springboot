import React from "react";
import "../../App.css";


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

export const PaymentRecieptModel = () => {
  return (
    <div className="container m-5 ">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#paymentModal"
      >
        Late Fee
      </button>

      <div
        className="modal blur-effect"
        id="paymentModal"
        tabindex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
        data-bs-backdrop='static'
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header bg-primary-subtle d-flex justify-content-center">
              <h1 className="modal-title fs-3" id="paymentModalLabel">
                Payment Details
              </h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="form-label fw-bold">
                    Name
                  </label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label fw-bold">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label fw-bold">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer bg-primary-subtle d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-warning "
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-success ">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
