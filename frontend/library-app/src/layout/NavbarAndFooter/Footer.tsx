import React from "react";

const Footer = () => {
  return (
    <footer className=" my-3  w-100 d-flex justify-content-center align-items-center pt-2" style={{backgroundColor:"#7676ff"}} >
      <div className="container row" >
        <div className="col-md-8 text-center text-md-start " style={{color:"white"}}>
          <p>&copy; DwR All Right Reserved </p>
        </div>
        <div className="col-md-4 text-md-end text-center " >
          <a href="#" className="mx-3" style={{ color:"white", textDecoration:"none"}}>Home</a>
          <a href="#" className="mx-3" style={{ color:"white", textDecoration:"none"}}>Search Book</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
