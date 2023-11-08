import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark"> {/* Changed bg-light to bg-dark */}
        <NavLink className="navbar-brand" to="/">
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto d-flex">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/create"> {/* Added text-white class */}
                Create Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/register"> {/* Added text-white class */}
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/login"> {/* Added text-white class */}
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}