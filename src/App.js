import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { LoginPage, MainPage, NotFound } from "./components";
import Navbar from "./components/Navbar";
function App() {
  //TODO: Fix Routing -> Change BrowserRouter to Router repath by F0Nt
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
