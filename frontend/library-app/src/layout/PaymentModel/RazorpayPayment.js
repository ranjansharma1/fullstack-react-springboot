import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import swal from "sweetalert";

export const RazorpayPayment = () => {
  const { authState } = useOktaAuth();

  //Defining amount for late fee
  const [lateFeeAmount] = useState(50); // Fixed amount that cannot be changed

  //taking details for payment
  const [username, setUsername] = useState("");
  const [remarks, setRemarks] = useState("");
  const [contact, setContact] = useState(0);

  //1. Created function to get amount from user
  const openRazorpayPopup = async (e) => {
    e.preventDefault();

    if (authState?.isAuthenticated) {
      //2. Fires order api to get order Id
      const url = `${process.env.REACT_APP_API}/payment/secure/create-order`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: lateFeeAmount,
          username: username,
          remarks: remarks,
          contact: contact,
          info: "order_request",
        }),
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        swal("Oops", "Some error occured", "error");
        throw new Error("Something Went Wrong");
      }
      const responseData = await response.json();
      console.log("Order Data: ", responseData);
      console.log("user email: ", authState.accessToken?.claims.sub);

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
          console.log(
            "Transaction Id: ",
            response.razorpay_payment_id,
            ", Order Id: ",
            response.razorpay_order_id,
            ", Signature : ",
            response.razorpay_signature
          );
          updateOrder(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            "paid",
            ""
          );
          swal(
            "Good job!",
            `payment successfull with id- ${response.razorpay_payment_id}`,
            "success"
          );
        },
        prefill: {
          name: username,
          email: authState.accessToken?.claims.sub,
          contact: contact,
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
        console.log("Payment Failed");
        console.log(response);
        console.log(response.error.description);
        updateOrder(
          response.error.metadata.payment_id,
          response.error.metadata.order_id,
          "failed",
          response.error.description
        );
        swal("Oops", `Payment failed- ${response.error.description}`, "error");
      });
      rzp1.open(); // Open the Razorpay popup
    } else {
      console.log("User not authenticated, please login first.");
    }
  };

  //4.Capture the payment details
  async function updateOrder(transactionId, orderId, status, failedDesc) {
    console.log("Captured the payment details");
    const url = `${process.env.REACT_APP_API}/payment/update-order`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionId: transactionId,
        orderId: orderId,
        status: status,
        failedDesc: failedDesc,
      }),
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      swal(
        "Oops",
        "Some error occured while capturing payment details",
        "error"
      );
      throw new Error("Something Went Wrong");
    }
    const responseData = await response.json();
    console.log(responseData);
  }
  return (
    <div className="container mt-5 w-50">
      <h1>Rozarpay payment Integration</h1>
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#paymentModal"
        >
          Late Fee
        </button>
      </div>

      <div
        className="modal blur-effect"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header bg-primary-subtle d-flex justify-content-center">
              <h1 className="modal-title fs-3" id="paymentModalLabel">
                Payment Details
              </h1>
            </div>
            <div className="modal-body">
              <form method="POST">
                <div className="mb-3">
                  <label
                    htmlFor="recipient-name"
                    className="form-label fw-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    id="recipient-name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label fw-bold">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Your contact number"
                    id="contact"
                    onChange={(e) => setContact(Number(e.target.value))}
                    value={contact !== 0 ? contact : ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="remarkscheck" className="form-label fw-bold">
                    Remarks
                  </label>
                  <textarea
                    type="email"
                    className="form-control"
                    placeholder="Additional Comments..."
                    id="remarkscheck"
                    aria-describedby="emailHelp"
                    rows={3}
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
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
              <button
                type="submit"
                className="btn btn-success "
                onClick={openRazorpayPopup}
                data-bs-dismiss="modal"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
