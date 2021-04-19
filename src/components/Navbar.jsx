import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../database/firebase";

export default class Navbar extends Component {
  render() {
    return (
      //TODO: Fix Dropdown (Already tried popper js didnt work)
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          SIGNAL
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/main-page" className="nav-link">
                Main
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            {/* //TODO: CSS Here Quick Pls */}
            <li className="navbar-item">
              <Link to={`/u/${auth.currentUser.uid}`} className="nav-link">
                <img src={auth.currentUser.photoURL} alt="userPhoto" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
