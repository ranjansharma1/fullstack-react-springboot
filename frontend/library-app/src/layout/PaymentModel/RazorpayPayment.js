import { useState } from "react";
import swal from "sweetalert";

export const RazorpayPayment = () => {
  const [amount, setAmount] = useState(25);

  //1. Created function to get amount from user
  const openRazorpayPopup = async (e) => {
    e.preventDefault();

    //2. Fires order api to get order Id
    const url = `${process.env.REACT_APP_API}/payment/create-order`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount, info: "order_request" }),
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      swal("Oops", "Some error occured", "error");
      throw new Error("Something Went Wrong");
    }
    const responseData = await response.json();
    console.log(responseData);
    swal("Good job!", `Your order is successfully generated with Order id:  ${responseData.id}`, "success");
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
