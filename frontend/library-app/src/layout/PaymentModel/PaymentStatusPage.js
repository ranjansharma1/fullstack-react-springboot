import { useLocation } from "react-router-dom";

export const PaymentStatusPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {};
  return (
    <div
      className={`bg-success-subtle ${
        orderData.status === "paid" ? "bg-success-subtle" : "bg-danger-subtle"
      }`}
      style={{ height: "100vh" }}
    >
      <div className="container">
        <h1 className="mb-5">Payment Receipt</h1>
        <h5>e-Receipt for State Bank Collect Payment</h5>
        <hr />
        <div className="container">
          {orderData.status === "paid" ? (
            <h6 className="text-success">Your payment is successfull</h6>
          ) : (
            <h6 className="text-danger">
              Failed: {orderData.failedDecription}
            </h6>
          )}
          <hr />
          <p>
            <strong>Date: </strong>
            {orderData.paymentDate}
          </p>
          <hr />
          <p>
            <strong>Transaction Number: </strong>
            {orderData.transactionId}
          </p>
          <hr />
          <p>
            <strong>Receipt Number: </strong>
            {orderData.reciept}
          </p>
          <hr />
          <p>
            <strong>Total Amount: </strong>
            {orderData.amount}
          </p>
          <hr />
          <p>
            <strong>Name: </strong>
            {orderData.userName}
          </p>
          <hr />
          <p>
            <strong>Email: </strong>
            {orderData.userEmail}
          </p>
          <hr />
          <p>
            <strong>Mobile Number: </strong>
            {orderData.phoneNumber}
          </p>
          <hr />
          <p>
            <strong>Book Name: </strong>
            {orderData.bookTitle}
          </p>
          <hr />
          <p>
            <strong>Remarks: </strong>
            {orderData.remarks}
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};
