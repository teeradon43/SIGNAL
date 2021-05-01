import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginNav.css";
import { login } from "./models/auth";
import noti from "../images/notifications.svg";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogin = () => {
    closeMobileMenu();
    login();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
        integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap"
        rel="stylesheet"
      />
      <nav className="navbar justify-content-center">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            SIGNAL
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={handleLogin}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/main-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <img src={ noti }/>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/main-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Main
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
