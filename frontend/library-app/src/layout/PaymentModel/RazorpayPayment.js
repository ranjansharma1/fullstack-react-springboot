import { useState } from "react";
import swal from "sweetalert";

export const RazorpayPayment = () => {
  const [amount, setAmount] = useState(25);
  const openRazorpayPopup = (e) => {
    e.preventDefault();
    console.log("payment button clicked: " + amount);
    swal("Good job!", "You clicked the payment button!", "success");
  };
  return (
    <div className="container mt-5 w-50">
      <h1>Rozarpay payment Integration</h1>
      <div className="card shadow">
        <div className="card-body">
          <form method="POST">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                className="form-control"
                id="amount"
                value={amount}
              />
            </div>
            <div className="mb-3 d-flex justify-content-center ">
              <button
                onClick={openRazorpayPopup}
                type="submit"
                className="btn btn-primary"
              >
                Proceed to Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
