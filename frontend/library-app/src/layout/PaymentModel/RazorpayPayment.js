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

    //3. Razorpay integration code with submitting orderID to make payment successfull
    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Replace with your Key ID
      amount: responseData.amount, // Convert amount to currency subunits
      currency: responseData.currency,
      name: "Library Management Application",
      description: "Late Fee",
      image: require("../../images/dwrlogo.png"),
      order_id: responseData.id,
      handler: function (response) {
        console.log("Payment success: ");
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        swal(
          "Good job!",
          `payment successfull with id- ${response.razorpay_payment_id}`,
          "success"
        );
      },
      prefill: {
        name: "",
        email: "developwithranjan@gmail.com",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(response);
      console.log(response.error.code);
      console.log("Payment Failed");
      swal("Oops", `Payment failed- ${response.error.description}`, "error");
    });
    rzp1.open(); // Open the Razorpay popup
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
