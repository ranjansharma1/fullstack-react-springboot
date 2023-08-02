import React from "react";

const AlertMassage:React.FC<{massage:any}> = (props) => {
  return (
        <div className="position-fixed top-0 end-0" style={{ zIndex: 9999, marginTop: "56px", marginRight: "10px" }}>
          <div className="alert alert-success" role="alert">
            {props.massage}
          </div>
        </div>
  )
}
export default AlertMassage;