import React from "react";

const AlertMassage: React.FC<{ massage: any }> = (props) => {
  return (
    <div className="position-fixed top-0 end-0" style={{ zIndex: 9999, marginTop: "58px", marginRight: "3px" }}>
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{props.massage}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}
export default AlertMassage;