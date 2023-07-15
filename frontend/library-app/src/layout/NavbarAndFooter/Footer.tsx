import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-100 d-flex justify-content-center pt-2 " style={{ backgroundColor: "#7676ff" }}>
      <div className="container row" >
        <div className="col-md-8 text-center text-md-start " style={{color:"white"}}>
          <p>&copy; DwR All Right Reserved </p>
        </div>
        <div className="col-md-4 text-md-end text-center " >
          <Link to="/" className="mx-3" style={{ color:"white", textDecoration:"none"}}>Home</Link>
          <Link to="/search" className="mx-3" style={{ color:"white", textDecoration:"none"}}>Search Book</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
