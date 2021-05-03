import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginNav.css";
import { login } from "./models/auth";

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
    </>
  );
}

export default Navbar;
