import React, { Component, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../database/firebase";
import { logout } from "./models/auth";
import noti from "../images/notifications_white_24dp.svg";

import "./LoginNav.css";

export default function Navbar() {
  const history = useHistory();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [value, setValue] = useState("");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleLogout = () => {
    closeMobileMenu();
    logout();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    if (value) history.push(`/search/${value}`);
    else {
      history.push("/search/ ");
    }
    event.preventDefault();
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
    <div>
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
          <form onSubmit={handleSubmit} className="nav-search">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Search.."
            />
            <input type="submit" value="Find" />
          </form>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={handleLogout}>
                Logout
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
            <li className="nav-item">
              <Link
                to="/main-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <img src={noti} />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/u/${auth.currentUser.uid}`}
                className="nav-links"
                id="profilepic"
                height="40"
              >
                <img
                  src={auth.currentUser.photoURL}
                  width="30"
                  height="30"
                  alt="userPhoto"
                  className="nav-img"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
