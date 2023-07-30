import React from "react";
import { NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useOktaAuth } from '@okta/okta-react';

const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  // if (!authState) {
  //   return <SpinnerLoading />
  // }

  const handleLogout = async () => oktaAuth.signOut();

  // console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">DwR</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" >
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
            {authState?.isAuthenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/shelf">
                  My Library
                </NavLink>
              </li>
            }
            {authState?.isAuthenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState?.isAuthenticated ?
              <li className='nav-item m-1'>
                <NavLink type='button' className='btn btn-outline-success' to='/login'>Sign in</NavLink>
              </li>
              :
              <li>
                <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;