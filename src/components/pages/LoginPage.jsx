import "./css/LoginPage.css";
import "../../App.css";
import { login, logout } from "../models/auth";

const LoginPage = () => {
  return (
    <div className="hero-container">
      <h1>Lorem</h1>
      <p>Lorem</p>
      <div className="hero-btns">
        <button
          onClick={login}
          type="button"
          className="btn btn-outline-light mb-3 btn-lg mx-3"
        >
          Login with Google
        </button>
        <button
          onClick={logout}
          type="button"
          className="btn btn-outline-light mb-3 btn-lg mx-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
