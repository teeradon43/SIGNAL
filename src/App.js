import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { LoginPage, MainPage, NotFound } from "./components";
import Navbar from "./components/Navbar";
import LoginNav from "./components/LoginNav";

function App() {
  //TODO: Add routes: userProfile, SpecificPost, CreatePost, Calendar, SearchPage
  //TODO: Do AuthStateChange Switch between Navbar and LoginNav when login or not
  // * FYI [Login] -> <Navbar> : [Not Login] -> <LoginNav>
  return (
    <Router>
      <LoginNav/> {/* Navbar */}
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
  </Router>
  );
}

export default App;
